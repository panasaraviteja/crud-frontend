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

  // redirect if post does not exist
  if (!post) redirect("/posts");

  return <EditForm post={post} />;
}
