import Link from 'next/link';
import { auth } from '@/auth';
import { signOutAction } from '@/lib/auth-actions';
import NavLinks from './NavLinks';

const links = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings' },
];

const authLinkClass = 'text-muted hover:text-foreground border-b-2 border-transparent';

export default async function Header() {
  const session = await auth();

  return (
    <header className="border-line bg-surface border-b">
      <div className="flex p-5 sm:items-end sm:justify-between">
        <h1 className="font-display block text-3xl leading-tight font-semibold">
          Mountain Point 6th Ward
        </h1>
        <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
          <NavLinks links={links} />
          {session?.user ? (
            <form action={signOutAction}>
              <button type="submit" className={`cursor-pointer ${authLinkClass}`}>
                Sign out
              </button>
            </form>
          ) : (
            <Link href="/login" className={authLinkClass}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
