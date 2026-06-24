# Todo Client (React + Vite)

A real-project-style React frontend for the Go + MongoDB Todo API — structured with a service layer, a data hook, and small presentational components, the way you'd organize a production app rather than a single demo file.

## Structure

```
todo-react-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # Page layout, filters, counts
    ├── api/
    │   └── todoApi.js    # Fetch wrapper for the Go API (list/create/update/delete)
    ├── hooks/
    │   └── useTodos.js   # All CRUD state logic, decoupled from UI
    ├── components/
    │   ├── TodoForm.jsx  # Add-task input
    │   ├── TodoItem.jsx  # Single row: toggle, inline rename, delete
    │   └── TodoList.jsx  # List rendering + loading/error/empty states
    └── styles/
        └── index.css     # Tailwind + base styles
```

## Setup

```bash
cd todo-react-app
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173` and talks to your Go API at the URL set in `.env` (`VITE_API_BASE`, defaults to `http://localhost:8080`).

Make sure the Go backend is running first (with CORS enabled, MongoDB connected) — see the `todo-app` backend project.

## Features

- **List / create / update / delete** todos against the real API — no mock data.
- **Inline rename** — double-click a task, or use the pencil icon.
- **Toggle done** with optimistic-feeling UI (button disables mid-request).
- **Filter tabs** — All / Active / Done.
- **Loading, error, and empty states** handled explicitly, including a retry button if the API is unreachable.
- **Separated concerns** — API calls, state logic, and presentation live in different files, like you'd structure a real app.

## Build for production

```bash
npm run build
npm run preview
```

This outputs static files to `dist/`, which you can serve from any static host (just make sure `VITE_API_BASE` points at your deployed Go API).
