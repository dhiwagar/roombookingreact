'use client';

import { Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';

const newsItems = [
  {
    id: 1,
    title: 'New Heritage Wing Opening',
    excerpt: 'We are excited to announce the opening of our new heritage wing with 10 additional luxury suites.',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: '2024-01-15',
    author: 'Villa Shanti Team',
    category: 'Announcement'
  },
  {
    id: 2,
    title: 'Seasonal Menu Launch',
    excerpt: 'Our chef has curated a special seasonal menu featuring fresh local ingredients and traditional recipes.',
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: '2024-01-10',
    author: 'Chef Priya',
    category: 'Culinary'
  },
  {
    id: 3,
    title: 'Wellness Retreat Program',
    excerpt: 'Join our new wellness retreat program combining yoga, meditation, and Ayurvedic treatments.',
    image: 'https://images.pexels.com/photos/1308524/pexels-photo-1308524.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    date: '2024-01-05',
    author: 'Wellness Team',
    category: 'Wellness'
  }
];

export function NewsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            {t('newsTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('newsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.id} className="hover-lift overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-coral-500 text-white text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {item.author}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {item.excerpt}
                </p>
              </CardContent>

              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t('readMore')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-primary">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
}