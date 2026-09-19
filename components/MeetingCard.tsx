import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, meetingTypeLabels } from '@/lib/ward';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const speakers = meeting.speakers.filter((s) => s.type === 'speaker');

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className={'rounded-card bg-surface shadow-card block h-full border p-5 no-underline'}
    >
      <article className="flex h-full flex-col gap-3">
        <p className="heading">{meetingTypeLabels[meeting.meetingType]}</p>
        <h2 className="text-2xl">{formatMeetingDate(meeting.date)}</h2>
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
      </article>
    </Link>
  );
}
