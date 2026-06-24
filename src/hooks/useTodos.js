import { useState, useEffect, useCallback } from "react";
import { todoApi } from "../api/todoApi";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | ready
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await todoApi.list();
      setTodos(data || []);
      setStatus("ready");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTodo = useCallback(async (title) => {
    const created = await todoApi.create(title);
    setTodos((prev) => [created, ...prev]);
    return created;
  }, []);

  const toggleTodo = useCallback(async (todo) => {
    const updated = await todoApi.update(todo.id, { done: !todo.done });
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    return updated;
  }, []);

  const renameTodo = useCallback(async (id, title) => {
    const updated = await todoApi.update(id, { title });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const deleteTodo = useCallback(async (id) => {
    await todoApi.remove(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    todos,
    status,
    error,
    refresh,
    addTodo,
    toggleTodo,
    renameTodo,
    deleteTodo,
  };
}
