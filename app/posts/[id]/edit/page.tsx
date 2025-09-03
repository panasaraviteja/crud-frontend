"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "../../../../components/PostForm";
import { fetchPost, updatePost, deletePost } from "../../../../lib/api";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [initial, setInitial] = useState<{ title: string; content: string; author: string } | null>(null);

  useEffect(() => {
    fetchPost(id).then((p) => {
      setInitial({ title: p.title, content: p.content, author: p.author });
    });
  }, [id]);

  async function onSubmit(values: { title: string; content: string; author: string }) {
    await updatePost(id, values);
    router.push(`/posts/${id}`);
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      router.push("/"); // or "/posts" if you have a listing page
    }
  }

  if (!initial) return <div className="max-w-2xl mx-auto">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm initial={initial} onSubmit={onSubmit} submitLabel="Update" />

      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete Post
      </button>
    </div>
  );
}
