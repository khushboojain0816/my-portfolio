import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-full max-w-sm flex-col justify-center px-6 py-24">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Admin Login</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Enter the admin password to manage projects.
      </p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
