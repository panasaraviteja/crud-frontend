"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePost, deletePost } from "../../../../lib/api";

export default function EditForm({ post }: { post: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [author, setAuthor] = useState(post.author);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePost(post.id, { title, content, author });
      router.push("/posts"); // redirect to home
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await deletePost(post.id);
      router.push("/posts"); // redirect to home
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Post
      </h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Title"
          className="w-full border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-lg text-gray-700 shadow-sm transition duration-300"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Content"
          rows={6}
          className="w-full border-2 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-3 rounded-lg text-gray-700 shadow-sm transition duration-300 resize-none"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          placeholder="Author"
          className="w-full border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg text-gray-700 shadow-sm transition duration-300"
        />
        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
}
