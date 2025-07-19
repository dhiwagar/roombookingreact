'use client';

import { useState } from 'react';
import { Wifi, Car, Coffee, Tv, Bath, Wind, Users, Maximize, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/use-language';
import { useRouter } from 'next/navigation';

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    nameKey: 'deluxeRoom',
    price: 150,
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    amenities: ['wifi', 'tv', 'coffee', 'bath'],
    description: 'Spacious room with modern amenities and garden view. Features a comfortable king-size bed, work desk, and private bathroom with luxury amenities.',
    maxGuests: 2,
    size: '35 m²',
    features: ['King-size bed', 'Garden view', 'Work desk', 'Mini refrigerator', 'Safe deposit box'],
    rating: 4.8
  },
  {
    id: 2,
    name: 'Heritage Suite',
    nameKey: 'suiteRoom',
    price: 280,
    images: [
      'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    amenities: ['wifi', 'tv', 'coffee', 'bath', 'wind', 'car'],
    description: 'Luxurious suite with traditional decor and private balcony. Perfect for couples seeking an authentic heritage experience with modern luxury.',
    maxGuests: 4,
    size: '65 m²',
    features: ['Separate living area', 'Private balcony', 'Heritage furniture', 'Jacuzzi', 'Butler service'],
    rating: 4.9
  },
  {
    id: 3,
    name: 'Premium Room',
    nameKey: 'premiumRoom',
    price: 200,
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    amenities: ['wifi', 'tv', 'coffee', 'bath', 'wind'],
    description: 'Elegant room with premium furnishings and city view. Ideal for business travelers with enhanced comfort and convenience.',
    maxGuests: 3,
    size: '45 m²',
    features: ['City view', 'Premium bedding', 'Ergonomic chair', 'Coffee machine', 'High-speed internet'],
    rating: 4.7
  }
];

const amenityIcons = {
  wifi: { icon: Wifi, label: 'Free WiFi' },
  tv: { icon: Tv, label: 'Smart TV' },
  coffee: { icon: Coffee, label: 'Coffee/Tea' },
  bath: { icon: Bath, label: 'Private Bath' },
  wind: { icon: Wind, label: 'AC' },
  car: { icon: Car, label: 'Parking' }
};

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const { t } = useLanguage();
  const router = useRouter();

  const handleBookRoom = (room: any) => {
    // Navigate to book page with room data
    router.push(`/book?roomId=${room.id}&roomName=${encodeURIComponent(room.name)}&roomPrice=${room.price}`);
  };

  const handleViewDetails = (room: any) => {
    setSelectedRoom(room.id);
    // You could also implement a modal or drawer here for detailed view
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-coral-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('roomsTitle')}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('roomsSubtitle')}
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Card key={room.id} className="hover-lift overflow-hidden h-fit">
                <div className="relative">
                  <img
                    src={room.images[0]}
                    alt={t(room.nameKey as any)}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-coral-500 text-white">
                    <Users className="w-3 h-3 mr-1" />
                    {room.maxGuests}
                  </Badge>
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{room.rating}</span>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{t(room.nameKey as any)}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Maximize className="w-4 h-4" />
                        <span>{room.size}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-coral-500">
                        ${room.price}
                      </p>
                      <p className="text-sm text-gray-500">/{t('night')}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {room.description}
                  </p>

                  {/* Amenities */}
                  <div className="grid grid-cols-3 gap-2">
                    {room.amenities.map((amenity) => {
                      const amenityInfo = amenityIcons[amenity as keyof typeof amenityIcons];
                      const Icon = amenityInfo.icon;
                      return (
                        <div
                          key={amenity}
                          className="flex flex-col items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <Icon className="w-4 h-4 text-coral-500" />
                          <span className="text-xs text-center">{amenityInfo.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {room.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-coral-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewDetails(room)}
                  >
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

      {/* Room Details Modal/Drawer could be added here */}
    </div>
  );
}