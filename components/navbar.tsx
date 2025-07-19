'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSelector } from '@/components/language-selector';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    router.push('/book');
    setIsOpen(false); // Close mobile menu if open
  };

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('rooms'), href: '/rooms' },
    { name: t('restaurant'), href: '/restaurant' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('news'), href: '/news' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#f8f2ef] backdrop-blur-md shadow-lg'
          : 'bg-[#f8f2ef]'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[112px]">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-coral-500" />
            <span className="text-xl font-bold gradient-text">Villa Shanti</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-coral-500',
                  pathname === item.href
                    ? 'text-coral-500'
                    : isScrolled
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-900'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* <ThemeToggle /> */}
            <LanguageSelector />
            <Button className="btn-primary" onClick={handleBookNow}>
              {t('book')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={isScrolled ? 'text-gray-900 dark:text-gray-100' : 'text-white'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-3 py-2 text-base font-medium rounded-md transition-colors',
                  pathname === item.href
                    ? 'text-coral-500 bg-coral-50 dark:bg-coral-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-coral-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2 flex items-center space-x-2">
              <LanguageSelector />
              <Button className="btn-primary flex-1" onClick={handleBookNow}>
                {t('book')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}