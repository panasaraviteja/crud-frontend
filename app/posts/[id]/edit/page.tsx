"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPost, updatePost, deletePost } from "../../../../lib/api";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params; // ✅ just use params directly

  const [post, setPost] = useState<{ title: string; content: string; author: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await fetchPost(id);
        setPost({ title: data.title, content: data.content, author: data.author });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!post) return;
    await updatePost(id, post);
    router.push(`/posts/${id}`);
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      router.push("/");
    }
  }

  if (loading) return <div className="max-w-2xl mx-auto">Loading...</div>;
  if (!post) return <div className="max-w-2xl mx-auto">Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label className="w-32 font-semibold">Title:</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="flex-1 border p-2 rounded"
          />
        </div>

        <div className="flex items-start">
          <label className="w-32 font-semibold pt-2">Content:</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="flex-1 border p-2 rounded"
            rows={5}
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-semibold">Author:</label>
          <input
            type="text"
            value={post.author}
            onChange={(e) => setPost({ ...post, author: e.target.value })}
            className="flex-1 border p-2 rounded"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
