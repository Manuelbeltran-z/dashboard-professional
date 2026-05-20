# Dashboard Profesional

A professional admin dashboard built with React 18, TypeScript, and modern tooling.

## Live Demo

[View on Vercel](https://dashboard-professional-1jibb8a61-manuel-beltran-s-projects.vercel.app)

##  Screenshots

> Login → Dashboard → Users → Posts

##  Features

-  **Authentication** — Login with form validation (React Hook Form + Zod)
-  **Protected Routes** — Dashboard inaccessible without login (React Router v6)
-  **Users** — List with real-time search filter + user detail page
-  **Posts** — CRUD: view, create, and delete posts
-  **Global State** — Auth managed with Zustand
-  **Server State** — Data fetching and caching with TanStack Query
-  **Tests** — 5 tests passing with Vitest + React Testing Library

##  Tech Stack

| Technology            | Purpose                |
| --------------------- | ---------------------- |
| React 18 + TypeScript | UI + type safety       |
| React Router v6       | Client-side routing    |
| Zustand               | Auth state management  |
| TanStack Query v5     | Server state + caching |
| React Hook Form + Zod | Form validation        |
| Vitest + RTL          | Testing                |
| Vite                  | Build tool             |

##  Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/dashboard-profesional.git
cd dashboard-profesional

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

##  Demo Credentials

```
Email:    usertest@admin.com
Password: 12345678
```

##  Running Tests

```bash
npm test
```

All 5 tests pass:

-  Login form renders correctly
-  Invalid credentials show error
-  Valid credentials call login store
-  Dashboard layout renders navigation
-  Dashboard header shows user name

##  Project Structure

```
src/
├── components/
│   └── ProtectedRoute.tsx   # Auth guard
├── pages/
│   ├── LoginPage.tsx        # /login
│   ├── DashboardLayout.tsx  # Layout with sidebar
│   ├── UsersPage.tsx        # /dashboard/users
│   ├── UserDetailPage.tsx   # /dashboard/users/:id
│   └── PostsPage.tsx        # /dashboard/posts (CRUD)
├── router/
│   └── index.tsx            # Route definitions
├── store/
│   └── useAuthStore.ts      # Zustand auth store
├── test/
│   └── dashboard.test.tsx   # 5 tests
└── types/
    └── index.ts             # Shared TypeScript interfaces
```

##  API

Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a free REST API for demo data.

##  License

MIT
