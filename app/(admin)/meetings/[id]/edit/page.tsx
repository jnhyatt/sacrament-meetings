import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditMeetingForm from '@/components/EditMeetingForm';
import { getMeetingById } from '@/lib/meetings-db';
import { formatMeetingDate } from '@/lib/ward';

export default async function EditMeetingPage({ params }: PageProps<'/meetings/[id]/edit'>) {
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
