const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

async function handleResponse(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return data;
}

export const todoApi = {
  async list() {
    const res = await fetch(`${API_BASE}/todos`);
    return handleResponse(res);
  },

  async get(id) {
    const res = await fetch(`${API_BASE}/todos/${id}`);
    return handleResponse(res);
  },

  async create(title) {
  console.log("API_BASE =", API_BASE);
  console.log("URL =", `${API_BASE}/todos`);

  const res = await fetch(`${API_BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  return handleResponse(res);
},

  async update(id, changes) {
    const res = await fetch(`${API_BASE}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });
    return handleResponse(res);
  },

  async remove(id) {
    const res = await fetch(`${API_BASE}/todos/${id}`, {
      method: "DELETE",
    });
    return handleResponse(res);
  },
};
