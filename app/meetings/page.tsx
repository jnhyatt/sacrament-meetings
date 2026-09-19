'use client';

import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[] | 'error' | null>(null);

  const populate = async () => {
    const res = await fetch('/api/meetings');
    if (!res.ok) {
      setMeetings('error');
      return;
    }
    setMeetings(await res.json());
  };

  useEffect(() => {
    populate();
  }, []);

  if (meetings === 'error') {
    return <p>Failed to load meetings, try again later.</p>;
  }

  if (meetings === null) {
    return <p>Please wait...</p>;
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => (
        <li key={meeting.id}>
          <MeetingCard meeting={meeting} />
        </li>
      ))}
    </ul>
  );
}
