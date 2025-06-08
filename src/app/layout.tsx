import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { AnimateLayout } from './components/AnimateLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '파충류샵',
  description: '파충류 분양 마켓플레이스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://rsms.me/inter/inter.css"
        />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: 'system-ui, Inter, sans-serif' }}>
        <AnimateLayout>{children}</AnimateLayout>
      </body>
    </html>
  );
}
