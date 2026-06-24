import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setSubmitting(true);
    setLocalError(null);
    try {
      await onAdd(trimmed);
      setTitle("");
    } catch (err) {
      setLocalError(err.message || "Couldn't add that task.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Log a new task…"
          className="flex-1 rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm font-body text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={submitting || !title.trim()}
          className="flex items-center justify-center rounded-lg bg-ink px-4 py-3 text-paper disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent transition"
        >
          {submitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Plus size={16} />
          )}
        </button>
      </div>
      {localError && (
        <p className="mt-2 text-xs font-mono text-clay">{localError}</p>
      )}
    </form>
  );
}
