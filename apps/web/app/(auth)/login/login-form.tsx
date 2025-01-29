'use client';

export function LoginForm() {
  return (
    <form method="POST" action="/login" className="flex flex-col gap-4">
      <label>
        Email:
        <input name="email" type="email" required />
      </label>
      <label>
        Password:
        <input name="password" type="password" required />
      </label>

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
