// app/posts/[id]/edit/page.tsx
import { redirect } from "next/navigation";
import { fetchPost } from "../../../../lib/api";
import EditForm from "./EditForm";

type EditPageProps = {
  params: { id: string };
};

export default async function EditPostPage({ params }: EditPageProps) {
  const { id } = params;

  // server-side fetch
  const post = await fetchPost(id);

  // if post is null/undefined, redirect immediately
  if (!post) {
    redirect("/posts");
  }

  // render client form with pre-filled data
  return <EditForm post={post} />;
}
