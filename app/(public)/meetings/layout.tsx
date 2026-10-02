'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/meetings', label: 'All meetings', exact: true },
  { href: '/meetings/current', label: 'This Sunday' },
  { href: '/meetings/new', label: 'New meeting' },
];

export default function MeetingsLayout({ children }: LayoutProps<'/meetings'>) {
  const pathname = usePathname();

  return (
    <div className="max-w-content px-page mx-auto pt-8">
      <div className="border-line mb-8 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="heading">Sacrament Meetings</p>
          <h1 className="mt-1 text-3xl">Meeting Agendas</h1>
        </div>
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
      </div>
      {children}
    </div>
  );
}
