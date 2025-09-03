import React from "react"
import { fetchPosts } from "./../lib/api";
import "./globals.css";
import PostCard from "../components/PostCard";

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <section>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Posts</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.length ? (
          posts.map((p: any) => <PostCard key={p._id} post={p} />)
        ) : (
          <p className="text-gray-500">No posts yet. Create your first one!</p>
        )}
      </div>
    </section>
  );
}
