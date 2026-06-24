import { Loader2 } from "lucide-react";
import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  status,
  error,
  filter,
  onToggle,
  onRename,
  onDelete,
  onRetry,
}) {
  if (status === "loading" && todos.length === 0) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-ink/40 font-mono text-sm">
        <Loader2 size={16} className="animate-spin" />
        Loading tasks…
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="py-10 text-center">
        <p className="text-sm font-body text-clay mb-3">
          {error || "Couldn't reach the API."}
        </p>
        <button
          onClick={onRetry}
          className="text-xs font-mono uppercase tracking-wide text-accent hover:text-accentDark"
        >
          Try again
        </button>
      </div>
    );
  }

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="py-10 text-center text-ink/40 font-body text-sm">
        {filter === "done"
          ? "Nothing completed yet."
          : filter === "active"
          ? "Nothing pending — you're caught up."
          : "No tasks logged yet. Add your first one above."}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-ink/10 bg-white overflow-hidden">
      {filtered.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
