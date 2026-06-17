'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  role: string;
};

export default function EmployeePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/users/${id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading employee details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Employee not found.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div
          className="rounded-2xl shadow-lg p-6 mb-8"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <h1 className="text-4xl font-bold">Employee Details</h1>
          <p className="mt-2 opacity-70">
            View and manage employee information securely.
          </p>
        </div>

        <div
          className="rounded-2xl shadow-lg p-8"
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
          }}
        >
          <div>
            <h2 className="text-3xl font-bold">
              {user.firstName} {user.lastName}
            </h2>

            <p className="mt-2 text-lg opacity-70">
              {user.role}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <p className="text-sm font-semibold opacity-70">Email</p>
              <p>{user.email}</p>
            </div>

            <div>
              <p className="text-sm font-semibold opacity-70">Age</p>
              <p>{user.age}</p>
            </div>

            <div>
              <p className="text-sm font-semibold opacity-70">Gender</p>
              <p>{user.gender}</p>
            </div>

            <div>
              <p className="text-sm font-semibold opacity-70">Phone</p>
              <p>{user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}