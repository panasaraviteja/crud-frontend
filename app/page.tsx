"use client";

import { useEffect, useState } from "react";
import { fetchPosts } from "../lib/api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Posts</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.length ? (
          posts.map((p) => <PostCard key={p._id} post={p} />)
        ) : (
          <p className="text-gray-500">No posts yet. Create your first one!</p>
        )}
      </div>
    </section>
  );
}
