import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditMeetingForm from '@/components/EditMeetingForm';
import { requireUser } from '@/lib/dal';
import { getMeetingById } from '@/lib/meetings-db';
import { formatMeetingDate } from '@/lib/ward';

export async function generateMetadata({
  params,
}: PageProps<'/meetings/[id]/edit'>): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));
  if (!meeting) {
    return {};
  }

  return { title: `Edit ${formatMeetingDate(meeting.date)}` };
}

export default async function EditMeetingPage({ params }: PageProps<'/meetings/[id]/edit'>) {
  await requireUser();
  const { id } = await params;

  const meetingId = Number(id);
  const meeting = await getMeetingById(meetingId);
  if (!meeting) {
    notFound();
  }

  return (
    <div className="max-w-content px-page mx-auto pt-8">
      <Link
        href="/meetings"
        className="text-muted hover:text-foreground mb-4 inline-block text-base"
      >
        ← All meetings
      </Link>
      <p className="heading">Edit meeting</p>
      <h1 className="mt-1 mb-8 text-3xl">{formatMeetingDate(meeting.date)}</h1>
      <EditMeetingForm id={meetingId} meeting={meeting} />
    </div>
  );
}
