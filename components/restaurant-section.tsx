'use client';

import { ChefHat, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';

const specialties = [
  {
    name: 'South Indian Cuisine',
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Authentic flavors from Tamil Nadu'
  },
  {
    name: 'Continental Delights',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'International cuisine with local ingredients'
  },
  {
    name: 'Fresh Seafood',
    image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Daily catch from local fishermen'
  }
];

export function RestaurantSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 gradient-text">
              {t('restaurantTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('restaurantSubtitle')}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <ChefHat className="w-5 h-5 text-coral-500" />
                <span className="text-gray-700 dark:text-gray-300">Expert chefs with 20+ years experience</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-coral-500" />
                <span className="text-gray-700 dark:text-gray-300">Fresh ingredients sourced daily</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-coral-500" />
                <span className="text-gray-700 dark:text-gray-300">Award-winning restaurant</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">
                {t('viewMenu')}
              </Button>
              <Button variant="outline" className="btn-secondary">
                {t('makeReservation')}
              </Button>
            </div>
          </div>

          {/* Specialties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specialties.map((specialty, index) => (
              <Card key={index} className="hover-lift overflow-hidden">
                <div className="relative">
                  <img
                    src={specialty.image}
                    alt={specialty.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-lg">{specialty.name}</h4>
                    <p className="text-sm opacity-90">{specialty.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}