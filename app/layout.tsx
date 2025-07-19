import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import Script from 'next/script';
import mani from '@/assets/999.png';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Villa Shanti - Boutique Heritage Hotel',
  description: 'Experience luxury and tranquility in our beautifully restored heritage property in Puducherry, where traditional charm meets modern comfort.',
  keywords: 'hotel, boutique hotel, heritage hotel, Puducherry, luxury accommodation, Villa Shanti',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
                        <main className="min-h-screen relative">
  {/* Main background */}
  <div 
    className="absolute inset-0 bg-[#1f2937] bg-cover bg-center"
    style={{ filter: 'grayscale(0.5)' }}
  />
  
  {/* Overlay for better text readability */}
  <div className="absolute inset-0 bg-gray-900/30" />
  
  {/* Decorative elements */}
  <div className="absolute top-[200px] left-10 bg-[url('../assets/999.png')] bg-contain bg-no-repeat z-50 opacity-100" />
  <div className="absolute bottom-20 right-10 w-40 h-40 bg-[url('/logo-watermark.png')] bg-contain bg-no-repeat opacity-10" />
  {/* <img src={mani.src} className='absolute' /> */}
  {/* Content */}
  <div className="relative z-10">
    {children}
  </div>
</main>
          <Footer />
          <Toaster />
        </ThemeProvider>

        {/* Zustand hydration script */}
        <Script
          id="zustand-hydration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Force Zustand to hydrate after the page loads
              if (typeof window !== 'undefined') {
                window.addEventListener('load', () => {
                  // Trigger a re-render to ensure hydration is complete
                  setTimeout(() => {
                    window.dispatchEvent(new Event('zustand-hydrated'));
                  }, 100);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}