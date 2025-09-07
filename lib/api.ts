const API_URL = process.env.NEXT_PUBLIC_API_URL ;

async function handle(res: Response) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  // Safely parse JSON (or return null/raw text if not JSON)
  const text = await res.text();

  if (!text.trim()) {
    return null; // empty response body
  }

  try {
    return JSON.parse(text);
  } catch {
    return text; // if body isn't valid JSON
  }
}

// Fetch all posts
export async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);
  return handle(res);
}

// Fetch single post
export async function fetchPost(id: string) {
  const res = await fetch(`${API_URL}/posts/${id}`);
  return handle(res);
}

// Create a new post
export async function createPost(data: { title: string; content: string; author: string }) {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handle(res);
}

// Update a post
export async function updatePost(id: string, data: { title: string; content: string; author: string }) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handle(res);
}

// Delete a post
export async function deletePost(id: string) {
  const res = await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });
  return handle(res); // won’t crash on empty/no JSON response
}
