'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/auth-actions';

const inputClass =
  'border-line bg-surface focus:border-accent aria-invalid:border-danger w-full rounded-md border px-3 py-2';

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [error, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="grid max-w-sm gap-4" aria-describedby="login-error">
      <div>
        <label htmlFor="email" className="mb-1 block text-base font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(error)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-base font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={Boolean(error)}
          className={inputClass}
        />
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <div id="login-error" aria-live="polite" aria-atomic="true">
        {error && <p className="text-danger text-base">{error}</p>}
      </div>
      <div>
        <button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          className="bg-primary text-primary-contrast rounded-full px-6 py-2 font-semibold disabled:opacity-60"
        >
          {isPending ? 'Signing in…' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
