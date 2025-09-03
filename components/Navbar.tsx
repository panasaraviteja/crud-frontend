
import Link from "next/link";
import React from "react"
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">My Blog</Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link href="/posts/create" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            New Post
          </Link>
        </div>
      </div>
    </nav>
  );
}

