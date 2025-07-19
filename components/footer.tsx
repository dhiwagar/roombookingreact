'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const quickLinks = [
    { name: t('home'), href: '/' },
    { name: t('rooms'), href: '/rooms' },
    { name: t('restaurant'), href: '/restaurant' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('news'), href: '/news' },
    { name: t('contact'), href: '/contact' }
  ];

  return (
    <footer className="bg-#[dddddd] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-coral-500" />
              <span className="text-2xl font-bold gradient-text">Villa Shanti</span>
            </div>
            <p className="text-gray-900 leading-relaxed">
              Experience luxury and tranquility in our beautifully restored heritage property,
              where traditional charm meets modern comfort.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-gray-900 hover:text-coral-500 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-900 hover:text-coral-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactInfo')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-coral-500 mt-1" />
                <div>
                  <p className="text-gray-900">
                    14 Suffren Street<br />
                    White Town, Puducherry<br />
                    India 605001
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-coral-500" />
                <p className="text-gray-900">+91 413 233 9999</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-coral-500" />
                <p className="text-gray-900">info@villashanti.com</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-900 mb-4">
              Subscribe to receive updates about special offers and events.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-coral-500"
              />
              <button className="w-full btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © 2024 Villa Shanti. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}