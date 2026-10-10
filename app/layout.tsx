import type { Metadata } from 'next';
import { Cormorant_Garamond, EB_Garamond } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const heading = Cormorant_Garamond({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const body = EB_Garamond({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: { template: '%s | Mountain Point 6th Ward', default: 'Mountain Point 6th Ward' },
  description: 'Sacrament meeting agendas for the Mountain Point 6th Ward.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
