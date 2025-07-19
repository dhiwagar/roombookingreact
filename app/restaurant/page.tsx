'use client';

import { useState } from 'react';
import { Clock, MapPin, Phone, Star, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/use-language';

const menuCategories = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    items: [
      { name: 'Coastal Prawns', price: 18, description: 'Fresh prawns with curry leaves and spices', image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
      { name: 'Paneer Tikka', price: 14, description: 'Grilled cottage cheese with mint chutney', image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
      { name: 'Fish Cutlet', price: 16, description: 'Local fish with traditional spices', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' }
    ]
  },
  {
    id: 'mains',
    name: 'Main Courses',
    items: [
      { name: 'Heritage Chicken Curry', price: 28, description: 'Traditional recipe passed down generations', image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
      { name: 'Grilled Sea Bass', price: 32, description: 'Fresh catch with herbs and lemon', image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
      { name: 'Vegetable Biryani', price: 24, description: 'Aromatic basmati rice with seasonal vegetables', image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      { name: 'Kulfi Ice Cream', price: 12, description: 'Traditional Indian ice cream with pistachios', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
      { name: 'Gulab Jamun', price: 10, description: 'Sweet dumplings in cardamom syrup', image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
      { name: 'Chocolate Fondant', price: 14, description: 'Warm chocolate cake with vanilla ice cream', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' }
    ]
  }
];

const restaurantInfo = {
  hours: {
    breakfast: '7:00 AM - 10:30 AM',
    lunch: '12:00 PM - 3:00 PM',
    dinner: '7:00 PM - 10:30 PM'
  },
  contact: '+91 413 233 9999',
  rating: 4.8,
  cuisine: 'South Indian, Continental, Seafood'
};

export default function RestaurantPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{t('restaurantTitle')}</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {t('restaurantSubtitle')}
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold">{restaurantInfo.rating}</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <ChefHat className="w-4 h-4 mr-1" />
                Award Winner
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Menu */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8 gradient-text">Our Menu</h2>
            
            <Tabs defaultValue="appetizers" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {menuCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {menuCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-8">
                  <div className="grid gap-6">
                    {category.items.map((item, index) => (
                      <Card key={index} className="hover-lift">
                        <CardContent className="flex gap-4 p-6">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-semibold">{item.name}</h3>
                              <span className="text-2xl font-bold text-coral-500">
                                ${item.price}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                              {item.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Restaurant Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold gradient-text">Restaurant Info</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-coral-500" />
                    Opening Hours
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Breakfast:</span>
                      <span>{restaurantInfo.hours.breakfast}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lunch:</span>
                      <span>{restaurantInfo.hours.lunch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dinner:</span>
                      <span>{restaurantInfo.hours.dinner}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-coral-500" />
                    Reservations
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {restaurantInfo.contact}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Cuisine Type</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {restaurantInfo.cuisine}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Make a Reservation</h3>
                <div className="space-y-4">
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral-500"
                  />
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral-500"
                  />
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral-500">
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests</option>
                  </select>
                  <Button className="btn-primary w-full">
                    {t('makeReservation')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Chef's Special</h3>
                <img
                  src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                  alt="Chef's Special"
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold">Today's Catch</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Fresh fish prepared with traditional Tamil spices and served with coconut rice.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-coral-500">$35</span>
                  <Button size="sm" className="btn-primary">
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}