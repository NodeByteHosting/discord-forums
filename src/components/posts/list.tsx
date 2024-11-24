'use client';

import { ArrowLeftIcon } from '@/components/icons/arrow-left';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { PaginationLink } from '@/components/others/pagination-link';
import { Post } from '@/components/posts/post';
import { Inbox } from '../icons/inbox';
import { Balancer } from 'react-wrap-balancer';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

type PostsListProps = {
  page: number;
};

export const PostsList = ({ page }: PostsListProps) => {
  const { data: posts, error } = useSWR(`/api/posts/by-page?page=${page}`, fetcher);

  if (error) {
    return (
      <div className="flex flex-col space-y-2 items-center justify-center">
        <Inbox size={14} className="opacity-75" />
        <div className="text-xl text-center w-full opacity-80">
          <Balancer>
            {error?.info?.message || error.message}
          </Balancer>
        </div>
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="flex flex-col space-y-2 items-center justify-center">
        <Inbox size={14} className="opacity-75" />
        <div className="text-xl text-center w-full opacity-80">
          <Balancer>
            Loading posts...
          </Balancer>
        </div>
      </div>
    );
  }

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

  const postsToRender = posts.slice(0, 20);
  const hasPreviousPage = page > 1;
  const hasNextPage = posts.length > 20;

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