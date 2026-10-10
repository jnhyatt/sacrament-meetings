import { auth } from '@/auth';
import MeetingsNav from '@/components/MeetingsNav';

const publicLinks = [
  { href: '/meetings', label: 'All meetings' },
  { href: '/meetings/current', label: 'This Sunday' },
];

const adminLinks = [{ href: '/meetings/new', label: 'New meeting' }];

export default async function MeetingsLayout({ children }: LayoutProps<'/meetings'>) {
  const session = await auth();
  const links = session?.user ? [...publicLinks, ...adminLinks] : publicLinks;

  return (
    <div className="max-w-content px-page mx-auto pt-8">
      <div className="border-line mb-8 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="heading">Sacrament Meetings</p>
          <h1 className="mt-1 text-3xl">Meeting Agendas</h1>
        </div>
        <MeetingsNav links={links} />
      </div>
      {children}
    </div>
  );
}
