import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';
import { currentSundayISO } from '@/lib/ward';

export default async function CurrentMeetingPage() {
  await connection();

  const [meeting] = await getMeetings({ date: currentSundayISO() });
  if (!meeting) {
    return <p>No meeting has been scheduled for this Sunday.</p>;
  }

  redirect(`/meetings/${meeting.id}`);
}
