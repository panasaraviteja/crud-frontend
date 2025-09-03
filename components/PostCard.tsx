import React from "react"
import Link from "next/link";
type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{post.title}</h2>
      <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
      <p className="text-sm text-gray-400 mt-3">By {post.author}</p>
      <div className="flex gap-4 mt-4">
        <Link href={`/posts/${post._id}`} className="text-blue-600 hover:underline">View</Link>
        <Link href={`/posts/${post._id}/edit`} className="text-green-600 hover:underline">Edit</Link>
      </div>
    </article>
  );
}

