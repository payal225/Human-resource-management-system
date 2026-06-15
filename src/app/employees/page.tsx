'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type User = {
  id: number;
  firstName: string;
  email: string;
};

export default function EmployeesPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="rounded-2xl shadow-lg p-6 mb-8 text-center"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <h1 className="text-4xl font-bold">Employees Directory</h1>
          <p className="mt-2 opacity-70">
            View all employees and their basic information.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading employees...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-xl shadow-md p-6"
                style={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                <h2 className="text-xl font-semibold">{user.firstName}</h2>

                <p className="mt-2 opacity-75 break-all">
                  {user.email}
                </p>

                <Link
                  href={`/employee/${user.id}`}
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}