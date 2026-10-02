import Link from 'next/link';
import CreateMeetingForm from '@/components/CreateMeetingForm';
import { currentSundayISO } from '@/lib/ward';

export default function NewMeetingPage() {
  return (
    <div className="max-w-content px-page mx-auto pt-8">
      <Link
        href="/meetings"
        className="text-muted hover:text-foreground mb-4 inline-block text-base"
      >
        ← All meetings
      </Link>
      <p className="heading">New meeting</p>
      <h1 className="mt-1 mb-8 text-3xl">Create a Meeting Agenda</h1>
      <CreateMeetingForm defaultDate={currentSundayISO()} />
    </div>
  );
}
