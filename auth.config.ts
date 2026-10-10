import type { NextAuthConfig } from 'next-auth';

// Edge-safe config shared with middleware.ts. Keep database and bcrypt imports out of this file.
export const authConfig = {
  pages: { signIn: '/login' },
  providers: [],
  callbacks: {
    authorized: ({ auth }) => !!auth?.user,
  },
} satisfies NextAuthConfig;
