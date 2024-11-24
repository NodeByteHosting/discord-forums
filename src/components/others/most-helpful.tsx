'use client';

import { db } from "@/utils/pgClient";
import { CheckCircleSolidIcon } from '@/components/icons/check-circle-solid'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'

export const MostHelpful = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostHelpfulUsers = async () => {
      const users = await db.user.findMany({
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          answersCount: true,
          isPublic: true,
          snowflakeId: true,
        },
        orderBy: {
          answersCount: 'desc',
          id: 'desc'
        },
        take: 15
      });
      setUsers(users as any);
      setLoading(false);
    };

    fetchMostHelpfulUsers();
  }, []);

  if (loading) {
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