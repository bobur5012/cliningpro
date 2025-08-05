import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/components/LanguageProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CliningPro - Профессиональные клининговые услуги в Ташкенте',
  description: 'Качественная уборка офисов, домов и коммерческих помещений с гарантией результата. Профессиональное оборудование, экологичные средства, доступные цены.',
  keywords: 'клининг, уборка, Ташкент, офисы, дома, профессиональная уборка',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}