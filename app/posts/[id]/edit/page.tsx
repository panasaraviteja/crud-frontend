"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPost, updatePost, deletePost } from "../../../../lib/api";
import { useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
};

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔄 Fetch posts on mount
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  // 🗑️ Delete handler
  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        setPosts((prev) => prev.filter((post) => post.id !== id)); // remove from state
        router.refresh(); // ✅ ensure UI updates if using server components
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  }

  if (loading) return <div className="max-w-2xl mx-auto">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📌 All Posts</h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.content}</p>
                <span className="text-sm text-gray-500">By {post.author}</span>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
