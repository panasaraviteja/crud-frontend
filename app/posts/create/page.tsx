'use client';
import { useRouter } from "next/navigation";
import PostForm from "../../../components/PostForm";
import { createPost } from "../../../lib/api";

export default function CreatePostPage() {
  const router = useRouter();

  async function onSubmit(values: { title: string; content: string; author: string }) {
    // ✅ Simple validation
    if (!values.title.trim() || !values.content.trim() || !values.author.trim()) {
      alert("All fields are required!");
      return;
    }
    if (values.title.length < 3) {
      alert("Title must be at least 3 characters long.");
      return;
    }

    await createPost(values);
    router.push("/");
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <PostForm onSubmit={onSubmit} submitLabel="Create" />
    </div>
  );
}
