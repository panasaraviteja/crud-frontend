import { fetchPost } from "../../../lib/api";
import React from "react";

export default async function ViewPost({ params }: { params: Promise<{ id: string }> }) {
  // ✅ unwrap params with React.use() in a Server Component
  const resolvedParams = await params;
  const post = await fetchPost(resolvedParams.id);

  return (
    <article className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <p className="text-gray-600 mb-6 whitespace-pre-wrap">{post.content}</p>
      <p className="text-sm text-gray-500">By {post.author}</p>
    </article>
  );
}
