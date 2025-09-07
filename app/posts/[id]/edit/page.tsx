"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPost, updatePost, deletePost } from "../../../../lib/api";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
};

type EditPageProps = {
  params: { id: string };
};

export default function EditPostPage({ params }: EditPageProps) {
  const router = useRouter();
  const { id } = params;

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPost(id);
        if (!data) {
          router.replace("/posts"); // immediate redirect
          return;
        }
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      } catch (error) {
        router.replace("/posts"); // redirect on error
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id, router]);

  if (loading || !post) {
    // don't render anything until post is fetched or redirect is triggered
    return null;
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost(id, { title, content, author });
      router.push("/posts"); // redirect after update
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      router.push("/posts"); // redirect after delete
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded"
            rows={5}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
