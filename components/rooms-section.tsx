'use client';

import { useState } from 'react';
import { Wifi, Car, Coffee, Tv, Bath, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/use-language';
import { useRouter } from 'next/navigation';

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    nameKey: 'deluxeRoom',
    price: 150,
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    amenities: ['wifi', 'tv', 'coffee', 'bath'],
    description: 'Spacious room with modern amenities and garden view',
    maxGuests: 2,
    size: '35 m²'
  },
  {
    id: 2,
    name: 'Heritage Suite',
    nameKey: 'suiteRoom',
    price: 280,
    image: 'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    amenities: ['wifi', 'tv', 'coffee', 'bath', 'wind', 'car'],
    description: 'Luxurious suite with traditional decor and private balcony',
    maxGuests: 4,
    size: '65 m²'
  },
  {
    id: 3,
    name: 'Premium Room',
    nameKey: 'premiumRoom',
    price: 200,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    amenities: ['wifi', 'tv', 'coffee', 'bath', 'wind'],
    description: 'Elegant room with premium furnishings and city view',
    maxGuests: 3,
    size: '45 m²'
  }
];

const amenityIcons = {
  wifi: Wifi,
  tv: Tv,
  coffee: Coffee,
  bath: Bath,
  wind: Wind,
  car: Car
};

export function RoomsSection() {
  const { t } = useLanguage();
  const router = useRouter();

  const handleBookRoom = (room: any) => {
    // Navigate to book page with room data
    router.push(`/book?roomId=${room.id}&roomName=${encodeURIComponent(room.name)}&roomPrice=${room.price}`);
  };

  const handleViewDetails = (room: any) => {
    // Navigate to rooms page with room filter
    router.push(`/rooms?room=${room.id}`);
  };

  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            {t('roomsTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('roomsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="hover-lift overflow-hidden bg-[url(../assets/4455.jpg)] bg-cover bg-blend-normal bg-no-repeat">
              <div className="relative">
                <img
                  src={room.image}
                  alt={t(room.nameKey as any)}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-coral-500 text-white">
                  {room.maxGuests} {t('guests')}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t(room.nameKey as any)}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {room.description}
                    </p>
                    <p className="text-sm text-gray-500">{room.size}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-coral-500">
                      ${room.price}
                    </p>
                    <p className="text-sm text-gray-500">/{t('night')}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => handleViewDetails(room)}>
                  {t('viewDetails')}
                </Button>
                <Button className="btn-primary flex-1" onClick={() => handleBookRoom(room)}>
                  {t('book')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}