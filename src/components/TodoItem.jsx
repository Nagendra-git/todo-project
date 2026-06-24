import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";

export default function TodoItem({ todo, onToggle, onRename, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const [busy, setBusy] = useState(false);

  const startEdit = () => {
    setDraft(todo.title);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft(todo.title);
  };

  const saveEdit = async () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === todo.title) {
      setEditing(false);
      return;
    }
    setBusy(true);
    try {
      await onRename(todo.id, trimmed);
      setEditing(false);
    } finally {
      setBusy(false);
    }
  };

  const handleToggle = async () => {
    setBusy(true);
    try {
      await onToggle(todo);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await onDelete(todo.id);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 border-b border-ink/8 last:border-0 transition ${
        busy ? "opacity-50" : ""
      }`}
    >
      <button
        onClick={handleToggle}
        disabled={busy}
        aria-label={todo.done ? "Mark as not done" : "Mark as done"}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
          todo.done
            ? "bg-sage border-sage text-paper"
            : "border-ink/25 text-transparent hover:border-accent"
        }`}
      >
        <Check size={12} strokeWidth={3} />
      </button>

      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") cancelEdit();
          }}
          className="flex-1 rounded-md border border-accent/40 px-2 py-1 text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          className={`flex-1 text-sm font-body cursor-text select-none ${
            todo.done ? "line-through text-ink/35" : "text-ink"
          }`}
          title="Double-click to rename"
        >
          {todo.title}
        </span>
      )}

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition">
        {editing ? (
          <>
            <button
              onClick={saveEdit}
              className="p-1.5 rounded-md text-sage hover:bg-sage/10"
              aria-label="Save"
            >
              <Check size={14} />
            </button>
            <button
              onClick={cancelEdit}
              className="p-1.5 rounded-md text-ink/40 hover:bg-ink/5"
              aria-label="Cancel"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={startEdit}
              className="p-1.5 rounded-md text-ink/40 hover:text-accent hover:bg-accent/10"
              aria-label="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-md text-ink/40 hover:text-clay hover:bg-clay/10"
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
