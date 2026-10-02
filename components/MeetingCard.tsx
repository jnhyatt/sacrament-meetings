import Link from 'next/link';
import DeleteMeetingForm from '@/components/DeleteMeetingForm';
import type { SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, meetingTypeLabels } from '@/lib/ward';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const speakers = meeting.speakers.filter((s) => s.type === 'speaker');
  const date = formatMeetingDate(meeting.date);

  return (
    <article className="rounded-card bg-surface shadow-card flex h-full flex-col border">
      <Link
        href={`/meetings/${meeting.id}`}
        className="flex flex-1 flex-col gap-3 p-5 no-underline"
      >
        <p className="heading">{meetingTypeLabels[meeting.meetingType]}</p>
        <h2 className="text-2xl">{date}</h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 text-base">
          <dt className="text-muted">Conducting</dt>
          <dd>{meeting.conducting}</dd>

          <dt className="text-muted">Speakers</dt>
          <dd>
            {speakers.length > 0
              ? speakers.map((s) => s.name).join(', ')
              : meeting.meetingType === 'testimony'
                ? 'Testimonies from the congregation'
                : 'To be announced'}
          </dd>
        </dl>
      </Link>
      <div className="border-line flex items-center gap-5 border-t px-5 py-3 text-base">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          aria-label={`Edit meeting on ${date}`}
          className="text-primary hover:underline"
        >
          Edit
        </Link>
        <DeleteMeetingForm id={meeting.id} label={date} />
      </div>
    </article>
  );
}
