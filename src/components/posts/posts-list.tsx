import { PrismaClient } from '@prisma/client';
import { ArrowLeftIcon } from '@/components/icons/arrow-left';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { PaginationLink } from '@/components/others/pagination-link';
import { Post } from '@/components/posts/post';
import { Inbox } from '../icons/inbox';
import { Balancer } from 'react-wrap-balancer';

const prisma = new PrismaClient();
const POSTS_BY_PAGE = 20;

const getPostsByPage = async (pageNumber: number) => {
  const limit = POSTS_BY_PAGE;
  const offset = (pageNumber - 1) * limit;

  const posts = await prisma.post.findMany({
    skip: offset,
    take: limit + 1,
    where: {
      isIndexed: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          username: true,
          avatarUrl: true,
        },
      },
      messages: {
        select: {
          id: true,
        },
      },
    },
  });

  return posts.map((post: any) => ({
    ...post,
    hasAnswer: post.messages.length > 0,
    messagesCount: post.messages.length,
  }));
};

type PostsListProps = {
  page: number;
};

export const PostsList = async ({ page }: PostsListProps) => {
  const posts = await getPostsByPage(page);

  if (posts.length === 0) {
    return (
      <div className="flex flex-col space-y-2 items-center justify-center">
        <Inbox size={14} className="opacity-75" />
        <div className="text-xl text-center w-full opacity-80">
          <Balancer>
            There are no posts indexed yet! Try checking again later
          </Balancer>
        </div>
      </div>
    );
  }

  const postsToRender = posts.slice(0, POSTS_BY_PAGE);
  const hasPreviousPage = page > 1;
  const hasNextPage = posts.length > POSTS_BY_PAGE;

  return (
    <>
      <div className="space-y-2">
        {postsToRender.map((post: any) => (
          <Post
            key={post.id.toString()}
            id={post.snowflakeId}
            title={post.title}
            createdAt={post.createdAt}
            messagesCount={post.messagesCount}
            hasAnswer={post.hasAnswer}
            author={{ avatar: post.user.avatarUrl, username: post.user.username }}
          />
        ))}
      </div>
      <div className="mt-4 flex space-x-4 justify-center">
        {hasPreviousPage && (
          <PaginationLink
            href={`/page/${page - 1}`}
            iconLeft={<ArrowLeftIcon size={4} />}
          >
            Previous
          </PaginationLink>
        )}
        {hasNextPage && (
          <PaginationLink
            href={`/page/${page + 1}`}
            iconRight={<ArrowRightIcon size={4} />}
          >
            Next
          </PaginationLink>
        )}
      </div>
    </>
  );
};