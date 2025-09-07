"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePost, deletePost } from "../../../../lib/api";

export default function EditForm({ post }: { post: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [author, setAuthor] = useState(post.author);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost(post.id, { title, content, author });
    router.push("/posts");
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    await deletePost(post.id);
    router.push("/posts");
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 max-w-xl mx-auto mt-10">
      <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full border p-2 rounded"/>
      <textarea value={content} onChange={e => setContent(e.target.value)} required className="w-full border p-2 rounded" rows={5}/>
      <input value={author} onChange={e => setAuthor(e.target.value)} required className="w-full border p-2 rounded"/>
      <div className="flex gap-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </form>
  );
}
