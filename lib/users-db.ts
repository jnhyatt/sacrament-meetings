import { sql } from '@vercel/postgres';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await sql<User>`
    SELECT id, name, email, password
    FROM users
    WHERE email = ${email.trim().toLowerCase()}`;
  return rows[0] ?? null;
}
