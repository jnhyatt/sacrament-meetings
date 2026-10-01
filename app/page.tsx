import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src="/images/hero.jpg" alt="The ward chapel" fill className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gray-800/70" />
      <div className="py-24 text-center text-white sm:py-32">
        <h1 className="text-5xl sm:text-6xl">Mountain Point 6th Ward</h1>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/meetings/current"
            className="rounded-full bg-white px-6 py-2.5 text-black no-underline hover:bg-gray-400"
          >
            This Sunday&rsquo;s agenda
          </Link>
          <Link
            href="/meetings"
            className="rounded-full bg-white px-6 py-2.5 text-black no-underline hover:bg-gray-400"
          >
            All meetings
          </Link>
        </div>
      </div>
    </section>
  );
}
