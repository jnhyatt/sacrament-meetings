import NavLinks from './NavLinks';

const links = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings' },
];

export default async function Header() {
  return (
    <header className="border-line bg-surface border-b">
      <div className="flex p-5 sm:items-end sm:justify-between">
        <h1 className="font-display block text-3xl leading-tight font-semibold">
          Mountain Point 6th Ward
        </h1>
        <NavLinks links={links} />
      </div>
    </header>
  );
}
