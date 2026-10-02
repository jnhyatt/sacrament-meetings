import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <div className="max-w-reading px-page py-section mx-auto text-center">
      <p className="heading">404</p>
      <h1 className="mt-1 text-3xl">Meeting not found</h1>
      <p className="text-muted mt-3">We couldn’t find a meeting with that ID.</p>
      <Link href="/meetings" className="bg-primary no-underline">
        Back to all meetings
      </Link>
    </div>
  );
}
