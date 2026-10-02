import { sql } from '@vercel/postgres';
import type { SacramentMeeting } from './types';

interface MeetingFilters {
  date?: string | null;
  query?: string | null;
}

export const MEETINGS_PAGE_SIZE = 6;

export async function getMeetings(filters: MeetingFilters = {}): Promise<SacramentMeeting[]> {
  const rows = await queryMeetings(filters);
  return rows.map(withoutTotalCount);
}

export async function getMeetingsPage(
  filters: MeetingFilters & { page?: number } = {}
): Promise<{ meetings: SacramentMeeting[]; totalPages: number }> {
  const page = Math.max(1, Math.floor(filters.page ?? 1));
  const rows = await queryMeetings(filters, MEETINGS_PAGE_SIZE, (page - 1) * MEETINGS_PAGE_SIZE);
  const totalCount = rows.length > 0 ? Number(rows[0].totalCount) : 0;

  return {
    meetings: rows.map(withoutTotalCount),
    totalPages: Math.ceil(totalCount / MEETINGS_PAGE_SIZE),
  };
}

function withoutTotalCount(row: SacramentMeeting & { totalCount: string }): SacramentMeeting {
  const meeting: Partial<typeof row> = { ...row };
  delete meeting.totalCount;
  return meeting as SacramentMeeting;
}

async function queryMeetings(
  { date = null, query = null }: MeetingFilters,
  limit: number | null = null,
  offset = 0
) {
  const pattern = query ? `%${query}%` : null;

  const { rows } = await sql<SacramentMeeting & { totalCount: string }>`
    SELECT
      count(*) OVER () AS "totalCount",
      id,
      to_char(date, 'YYYY-MM-DD') AS date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE (${date}::date IS NULL OR date = ${date}::date)
      AND (
        ${pattern}::text IS NULL OR 
        meeting_type ILIKE ${pattern} OR
        presiding ILIKE ${pattern} OR
        conducting ILIKE ${pattern} OR
        (SELECT string_agg(s->>'name', ' ') FROM jsonb_array_elements(speakers) AS s) ILIKE ${pattern}
      )
    ORDER BY date
    LIMIT ${limit} OFFSET ${offset}`;
  return rows;
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const { rows } = await sql<SacramentMeeting>`
    SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}`;
  return rows[0] ?? null;
}

export type MeetingInput = Omit<SacramentMeeting, 'id'>;

export async function createMeeting(meeting: MeetingInput): Promise<number> {
  const { rows } = await sql<{ id: number }>`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    )
    VALUES (
      ${meeting.date}::date, ${meeting.meetingType}, ${meeting.presiding}, ${meeting.conducting},
      ARRAY(SELECT jsonb_array_elements_text(${JSON.stringify(meeting.announcements ?? [])}::jsonb)),
      ${JSON.stringify(meeting.openingHymn)}::jsonb, ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)}::jsonb, ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb, ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.closingHymn)}::jsonb, ${meeting.closingPrayer}
    )
    RETURNING id`;
  return rows[0].id;
}

export async function updateMeeting(id: number, meeting: MeetingInput): Promise<boolean> {
  const { rowCount } = await sql`
    UPDATE meetings SET
      date = ${meeting.date}::date,
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ARRAY(SELECT jsonb_array_elements_text(${JSON.stringify(meeting.announcements ?? [])}::jsonb)),
      opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
      opening_prayer = ${meeting.openingPrayer},
      ward_business = ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      stake_business = ${meeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(meeting.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
      closing_prayer = ${meeting.closingPrayer}
    WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const { rowCount } = await sql`DELETE FROM meetings WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}
