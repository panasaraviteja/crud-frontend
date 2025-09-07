"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPost, updatePost, deletePost } from "../../../../lib/api";

export default function EditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPost(id);
      if (!data) {
        router.replace("/posts"); // redirect if post not found
        return;
      }
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
      setAuthor(data.author);
      setLoading(false);
    };
    getPost();
  }, [id, router]);

  if (loading || !post) return null; // render nothing while loading

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost(id, { title, content, author });
    router.push("/posts");
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    await deletePost(id);
    router.push("/posts");
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-xl mx-auto mt-10 space-y-4">
      <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded" required />
      <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full border p-2 rounded" rows={5} required />
      <input value={author} onChange={e => setAuthor(e.target.value)} className="w-full border p-2 rounded" required />
      <div className="flex gap-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </form>
  );
}
