'use client';

import { CheckCircleSolidIcon } from '@/components/icons/check-circle-solid'
import { fetcher } from '@/utils/fetcher';
import Link from 'next/link'
import useSWR from 'swr';

export const MostHelpful = () => {
  const { data: users, error } = useSWR('/api/users/most-helpful', fetcher);

  if (error) {
    return <div>{error?.info?.message || error.message}</div>;
  }

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-2 grid grid-cols-1 divide-y divide-neutral-800">
      {users.map((user: any) => (
        <div key={user.id} className="flex justify-between py-2">
          <div className="flex space-x-2 items-center">
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-4 h-4 rounded-full"
            />
            {user.isPublic ? (
              <Link
                className="opacity-90 text-white"
                href={`/user/${user.id}`}
              >
                {user.username}
              </Link>
            ) : (
              <div className="opacity-50">{user.username}</div>
            )}
          </div>
          <div className="flex items-center space-x-1 opacity-90">
            <CheckCircleSolidIcon size={5} />
            <span className="text-sm ">{user.answersCount}</span>
          </div>
        </div>
      ))}
    </div>
  );
};