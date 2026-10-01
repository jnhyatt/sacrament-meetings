'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavLink {
  href: string;
  label: string;
}

interface NavLinksProps {
  links: NavLink[];
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((link) => {
          const active =
            pathname === '/'
              ? pathname === link.href
              : pathname.startsWith(link.href + '/') || pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`border-b-2 ${active ? 'border-accent text-foreground' : 'text-muted hover:text-foreground border-transparent'}`}
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
