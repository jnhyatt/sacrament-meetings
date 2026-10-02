'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export interface MeetingsErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function MeetingsError({ error, retry }: MeetingsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="rounded-card border-line bg-surface shadow-card max-w-reading mx-auto border px-6 py-8 text-center sm:px-10"
    >
      <p className="heading">Something went wrong</p>
      <h2 className="mt-1 text-3xl">We couldn’t complete that request</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => retry()}
          className="bg-primary text-primary-contrast rounded-full px-6 py-2 font-semibold"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="hover:border-accent rounded-full border px-6 py-2 no-underline"
        >
          Back to all meetings
        </Link>
      </div>
    </div>
  );
}
