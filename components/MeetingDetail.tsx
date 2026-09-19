import type { ReactNode } from 'react';
import type { Hymn, SacramentMeeting } from '@/lib/types';
import { formatMeetingDate, meetingTypeLabels } from '@/lib/ward';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-line border-t p-2 first:border-t-0">
      <h2 className="heading mb-3 font-serif">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex sm:flex-row">
      <dt className="text-muted sm:w-48">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function HymnText({ hymn }: { hymn: Hymn }) {
  return (
    <p>
      #{hymn.number} {hymn.title}
    </p>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const announcements = meeting.announcements ?? [];
  const isTestimony = meeting.meetingType === 'testimony';

  return (
    <article className="rounded-card border-line bg-surface shadow-card border px-6 py-8 sm:px-10">
      <header className="mb-4 text-center">
        <p className="heading">{meetingTypeLabels[meeting.meetingType]}</p>
        <h1 className="m-2 text-4xl sm:text-5xl">{formatMeetingDate(meeting.date)}</h1>
      </header>

      <Section title="Leadership">
        <dl>
          <Row label="Presiding">{meeting.presiding}</Row>
          <Row label="Conducting">{meeting.conducting}</Row>
        </dl>
      </Section>

      <Section title="Announcements">
        {announcements.length > 0 ? (
          <ul>
            {announcements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No announcements.</p>
        )}
      </Section>

      <Section title="Opening">
        <dl>
          <Row label="Opening Hymn">
            <HymnText hymn={meeting.openingHymn} />
          </Row>
          <Row label="Invocation">{meeting.openingPrayer}</Row>
        </dl>
      </Section>

      <Section title="Business">
        <dl>
          <Row label="Ward Business">
            {meeting.wardBusiness.length > 0 ? (
              <ul>
                {meeting.wardBusiness.map((item) => (
                  <li key={item.description}>{item.description}</li>
                ))}
              </ul>
            ) : (
              <span className="text-muted">None</span>
            )}
          </Row>
          <Row label="Stake Business">
            {meeting.stakeBusiness ? 'Yes' : <span className="text-muted">None</span>}
          </Row>
        </dl>
      </Section>

      <Section title="Sacrament">
        <dl>
          <Row label="Sacrament Hymn">
            <HymnText hymn={meeting.sacramentHymn} />
          </Row>
        </dl>
      </Section>

      <Section title={isTestimony ? 'Testimonies' : 'Speakers & Music'}>
        {meeting.speakers.length > 0 ? (
          <ol>
            {meeting.speakers.map((item, i) => (
              <li key={`${item.name}-${i}`} className="flex gap-4">
                <p>
                  {item.name}
                  {item.type === 'musical-number' && (
                    <span className="border-line text-muted rounded-full border px-2 text-xs">
                      Musical number
                    </span>
                  )}
                </p>
                {item.topic && <p className="text-muted">{item.topic}</p>}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-muted">
            {isTestimony
              ? 'The pulpit is open for members of the congregation to bear testimony.'
              : 'Speakers to be announced.'}
          </p>
        )}
      </Section>

      <Section title="Closing">
        <dl>
          <Row label="Closing Hymn">
            <HymnText hymn={meeting.closingHymn} />
          </Row>
          <Row label="Benediction">{meeting.closingPrayer}</Row>
        </dl>
      </Section>
    </article>
  );
}
