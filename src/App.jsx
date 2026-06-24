import { useState, useMemo } from "react";
import { RefreshCw, ListChecks } from "lucide-react";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "done", label: "Done" },
];

export default function App() {
  const { todos, status, error, refresh, addTodo, toggleTodo, renameTodo, deleteTodo } =
    useTodos();
  const [filter, setFilter] = useState("all");

  const counts = useMemo(
    () => ({
      total: todos.length,
      active: todos.filter((t) => !t.done).length,
      done: todos.filter((t) => t.done).length,
    }),
    [todos]
  );

  return (
    <div className="min-h-screen flex justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-lg">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-ink/50 font-mono text-xs uppercase tracking-widest mb-2">
            <ListChecks size={14} />
            Worklist
          </div>
          <h1 className="font-display text-4xl text-ink leading-tight">
            Today's tasks
          </h1>
          <p className="font-body text-sm text-ink/50 mt-1">
            {status === "loading" && todos.length === 0
              ? "Syncing with the server…"
              : `${counts.active} pending · ${counts.done} done · ${counts.total} total`}
          </p>
        </header>

        <TodoForm onAdd={addTodo} />

        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1 bg-ink/5 rounded-lg p-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wide transition ${
                  filter === f.key
                    ? "bg-white text-ink shadow-sm"
                    : "text-ink/40 hover:text-ink/70"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            onClick={refresh}
            className="p-2 rounded-md text-ink/40 hover:text-accent hover:bg-accent/10 transition"
            aria-label="Refresh"
            title="Refresh"
          >
            <RefreshCw
              size={15}
              className={status === "loading" ? "animate-spin" : ""}
            />
          </button>
        </div>

        <TodoList
          todos={todos}
          status={status}
          error={error}
          filter={filter}
          onToggle={toggleTodo}
          onRename={renameTodo}
          onDelete={deleteTodo}
          onRetry={refresh}
        />

        <footer className="mt-6 text-center">
          <p className="font-mono text-[11px] text-ink/30">
            Double-click any task to rename it · backed by Go + MongoDB
          </p>
        </footer>
      </div>
    </div>
  );
}
