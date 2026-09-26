import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

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
