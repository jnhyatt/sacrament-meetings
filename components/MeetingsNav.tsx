'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLink } from './NavLinks';

export default function MeetingsNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className="hover:border-accent hover:text-foreground rounded-full border px-4 py-1.5 text-base"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
