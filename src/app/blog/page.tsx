'use client';

import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
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
          className="rounded-2xl shadow-lg p-6 mb-8"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <h1 className="text-3xl font-bold">
            Welcome to the HR Dashboard
          </h1>

          <p className="mt-2 opacity-70">
            Manage employee documents, verify their authenticity, and
            keep track of all important files in one place.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Latest HR News
        </h2>

        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="rounded-xl shadow-md p-5 transition"
                style={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3 className="text-xl font-bold">
                  {post.title}
                </h3>

                <p className="mt-2 opacity-80">
                  {post.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}