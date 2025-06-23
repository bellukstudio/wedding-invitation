import { Dancing_Script, Geist_Mono } from 'next/font/google';
import './globals.css';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Undangan Pernikahan",
  description: "Pernikahan Wahyu & Riski",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${dancingScript.variable} ${geistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
