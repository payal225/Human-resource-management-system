'use client';

import { useQuery } from '@tanstack/react-query';

export default function UsersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h1>Users</h1>

      {data?.map((user: any) => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  );
}