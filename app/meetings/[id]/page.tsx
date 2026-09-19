'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingPage({ params }: PageProps<'/meetings/[id]'>) {
  const { id } = use(params);
  const [meeting, setMeeting] = useState<SacramentMeeting | 'error' | 'not-found' | null>(null);

  const populate = async () => {
    const res = await fetch(`/api/meetings/${encodeURIComponent(id)}`);
    if (res.status === 400 || res.status === 404) {
      setMeeting('not-found');
      return;
    }
    if (!res.ok) {
      setMeeting('error');
      return;
    }
    setMeeting(await res.json());
  };

  useEffect(() => {
    populate();
  }, [id]);

  if (meeting === 'not-found') {
    notFound();
  }

  if (meeting === 'error') {
    return <p>Failed to load meeting, try again later.</p>;
  }

  if (meeting === null) {
    return <p>Please wait...</p>;
  }

  return (
    <div className="max-w-reading mx-auto">
      <Link
        href="/meetings"
        className="text-muted hover:text-foreground mb-4 inline-block text-base"
      >
        ← All meetings
      </Link>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
