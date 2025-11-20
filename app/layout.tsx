import QueryProvider from '../src/providers/QueryProvider'

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Products",
  description: "Каталог товаров",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
