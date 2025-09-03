import React from "react"
import { useState } from "react";

type Values = { title: string; content: string; author: string; };
export default function PostForm({
  initial = { title: "", content: "", author: "" },
  onSubmit,
  submitLabel = "Save",
}: {
  initial?: Values;
  onSubmit: (v: Values) => Promise<void> | void;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Values>(initial);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <input
        className="border rounded w-full p-3"
        placeholder="Title"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        required
      />
      <textarea
        className="border rounded w-full p-3 min-h-[160px]"
        placeholder="Content"
        value={values.content}
        onChange={(e) => setValues({ ...values, content: e.target.value })}
        required
      />
      <input
        className="border rounded w-full p-3"
        placeholder="Author"
        value={values.author}
        onChange={(e) => setValues({ ...values, author: e.target.value })}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}