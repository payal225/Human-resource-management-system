'use client';

import { useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  image: string;
  role: string;
};

export default function Page() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://dummyjson.com/users/${params.id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div
          className="rounded-2xl shadow-lg p-6 mb-8"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <h1 className="text-4xl font-bold">
            Employee Details
          </h1>

          <p className="mt-2 opacity-70">
            View and manage employee information securely.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-lg">
            Loading employee details...
          </div>
        ) : user ? (
          <div
            className="rounded-2xl shadow-lg p-8"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center gap-6 mb-8">
              <Image
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                width={128}
                height={128}
                className="w-32 h-32 rounded-full border-4"
              />

              <div>
                <h2 className="text-3xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-lg opacity-70 mt-2">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-semibold opacity-70 text-sm">
                    Email
                  </p>
                  <p className="text-lg">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="font-semibold opacity-70 text-sm">
                    Age
                  </p>
                  <p className="text-lg">
                    {user.age}
                  </p>
                </div>

                <div>
                  <p className="font-semibold opacity-70 text-sm">
                    Gender
                  </p>
                  <p className="text-lg">
                    {user.gender}
                  </p>
                </div>

                <div>
                  <p className="font-semibold opacity-70 text-sm">
                    Phone
                  </p>
                  <p className="text-lg">
                    {user.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-lg opacity-70">
            Employee not found
          </div>
        )}
      </div>
    </div>
  );
}