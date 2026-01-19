'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">Blog & News</h1>
        <p className="text-lg text-secondary">Interior design tips and inspiration</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200">
          <p className="text-secondary text-lg">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-200 hover:border-accent transition-all duration-300 cursor-pointer hover:shadow-xl"
            >
              {post.thumbnail && (
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <div
                    className="w-full h-full bg-gray-200 hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundImage: `url(${post.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-primary">{post.title}</h2>
                <p className="text-secondary mb-4 line-clamp-3">{post.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-accent hover:text-accent/80 transition-colors font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
