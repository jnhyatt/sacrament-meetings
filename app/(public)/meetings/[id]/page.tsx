import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import { formatMeetingDate, meetingTypeLabels } from '@/lib/ward';

export async function generateMetadata({ params }: PageProps<'/meetings/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));
  if (!meeting) {
    return {};
  }

  const label = meetingTypeLabels[meeting.meetingType];
  const date = formatMeetingDate(meeting.date);
  return {
    title: `${label}, ${date}`,
    description: `Agenda for ${label} on ${date}.`,
  };
}

export default async function MeetingPage({ params }: PageProps<'/meetings/[id]'>) {
  const { id } = await params;

  const meeting = await getMeetingById(Number(id));
  if (!meeting) {
    notFound();
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
