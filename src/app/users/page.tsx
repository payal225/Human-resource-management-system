'use client';

import { useQuery } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export default function UsersPage() {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }

      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h1>Users</h1>

      {data?.map((user) => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  );
}