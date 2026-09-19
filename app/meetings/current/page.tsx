'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { SacramentMeeting } from '@/lib/types';
import { currentSundayISO } from '@/lib/ward';

export default function CurrentMeetingPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'error' | 'empty' | null>(null);

  const populate = async () => {
    const res = await fetch(`/api/meetings?date=${currentSundayISO()}`);
    if (!res.ok) {
      setStatus('error');
      return;
    }
    const [meeting]: SacramentMeeting[] = await res.json();
    if (!meeting) {
      setStatus('empty');
      return;
    }
    router.replace(`/meetings/${meeting.id}`);
  };

  useEffect(() => {
    populate();
  }, []);

  if (status === 'error') {
    return <p>Failed to load this Sunday&apos;s meeting, try again later.</p>;
  }

  if (status === 'empty') {
    return <p>No meeting has been scheduled for this Sunday.</p>;
  }

  return <p>Please wait...</p>;
}
