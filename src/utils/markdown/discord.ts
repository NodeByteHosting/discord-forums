import { toHTML } from 'discord-markdown'
import { load } from 'cheerio'
import { db } from '../pgClient';
import { getCanonicalPostUrl } from '../messages/urls'
import { sanitizeText } from 'simple-markdown'
import { cache } from 'react'

const fetchUser = cache(async (userId: string) => {
  return await db.user.findFirst({
    where: {
      snowflakeId: userId
    },
    select: {
      snowflakeId: true,
      username: true
    }
  })
})

const fetchChannel = cache(async (channelId: string) => {
  return await db.channel.findFirst({
    where: {
      snowflakeId: channelId
    },
    select: {
      snowflakeId: true,
      name: true
    }
  })
})

const fetchPost = cache(async (postId: string) => {
  return db.post.findFirst({
    where: {
      snowflakeId: postId
    },
    select: {
      snowflakeId: true,
      title: true
    }
  })
})

const channelLinkRegex =
  /https:\/\/discord\.com\/channels\/(?<guild>\d+)\/(?<channel>\d+)(\/(?<message>\d+))?/g
const userMention = /<@!?(?<user>\d+)>/g
const channelMention = /<#(?<channel>\d+)>/g

export const extractMentions = cache((content: string) => {
  const postIds = new Set<string>(
    Array.from(
      content.matchAll(channelLinkRegex),
      (m) => m.groups?.channel ?? '',
    ),
  )
  const memberIds = new Set<string>(
    Array.from(content.matchAll(userMention), (m) => m.groups?.user ?? ''),
  )
  const channelIds = new Set<string>(
    Array.from(
      content.matchAll(channelMention),
      (m) => m.groups?.channel ?? '',
    ),
  )
  return { postIds, memberIds, channelIds }
})

export const fetchMentions = async (content: string) => {
  const { postIds, memberIds, channelIds } = extractMentions(content)

  // Fetch from db/cache
  const [posts, users, channels] = await Promise.all([
    Promise.all(Array.from(postIds).map(fetchPost)),
    Promise.all(Array.from(memberIds).map(fetchUser)),
    Promise.all(Array.from(channelIds).map(fetchChannel)),
  ])

  return { posts, users, channels }
}

export const parseDiscordMessage = async (
  content: string,
  justText = false,
) => {
  // Get mentions
  const { users, channels, posts } = await fetchMentions(content)

  // Replace internal links
  content = content.replace(
    channelLinkRegex,
    (match, guildId, channelId, _, messageId) => {
      const post = posts.find((p) => p?.snowflakeId === channelId)
      if (!post) return match
      return `${getCanonicalPostUrl(post.snowflakeId)}${messageId ? `#message-${messageId}` : ''
        }`
    },
  )

  // Parse the content
  const html = toHTML(content, {
    discordCallback: {
      user: (node) => {
        const user = users.find((u) => u?.snowflakeId === node.id)
        if (!user) return `<i>@Unknown User</i>`

        const userName = sanitizeText(user.username)
        return `@${userName}`
      },
      channel: (node) => {
        const channel = channels.find((c) => c?.snowflakeId === node.id)
        let channelName = channel && sanitizeText(channel.name)

        if (!channelName) {
          const post = posts.find((p) => p?.snowflakeId === node.id)
          if (!post) return `<i>#Unknown Channel</i>`
          channelName = post.title
        }
        return `#${channelName}`
      },
    },
  })

  // Fixing some of the HTML
  const $ = load(html)

  // Links
  $('a').attr('target', '_blank').attr('rel', 'noopener nofollow ugc')

  // Code blocks
  $('pre:has(code)').addClass('d-code-block')

  // Inline code
  $('code:not(pre *)').addClass('d-code-inline')

  if (justText) {
    return $('body').text() ?? ''
  }

  return $('body').html() ?? ''
}