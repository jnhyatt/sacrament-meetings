import { Suspense } from 'react';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import { getMeetingsPage } from '@/lib/meetings-db';

export default async function MeetingsPage({ searchParams }: PageProps<'/meetings'>) {
  const { query, page } = await searchParams;
  const search = typeof query === 'string' ? query : undefined;
  const currentPage = Number(page) || 1;

  const { meetings, totalPages } = await getMeetingsPage({ query: search, page: currentPage });

  return (
    <>
      <Suspense>
        <MeetingSearch />
      </Suspense>
      {meetings.length === 0 ? (
        <p className="text-muted">
          {search ? `No meetings match “${search}”.` : 'No meetings have been scheduled yet.'}
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard meeting={meeting} />
            </li>
          ))}
        </ul>
      )}
      {totalPages > 1 && (
        <Suspense>
          <Pagination totalPages={totalPages} />
        </Suspense>
      )}
    </>
  );
}
