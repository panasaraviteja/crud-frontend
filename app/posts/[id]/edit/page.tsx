// app/posts/[id]/edit/page.tsx
import { redirect } from "next/navigation";
import { fetchPost } from "../../../../lib/api";
import EditForm from "./EditForm"; // move your form to a separate client component

type EditPageProps = {
  params: { id: string };
};

export default async function EditPostPage({ params }: EditPageProps) {
  const { id } = params;
  const post = await fetchPost(id);

  if (!post) {
    redirect("/posts"); // server-side redirect if post doesn't exist
  }

  return <EditForm post={post} />; // render your client-side edit form
}
