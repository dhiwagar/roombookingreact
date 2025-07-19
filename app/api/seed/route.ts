import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Room from '@/models/Room';

const sampleRooms = [
  {
    roomId: 'RM001',
    name: 'Deluxe Room',
    type: 'deluxe',
    price: 150,
    maxGuests: 2,
    size: '35 m²',
    amenities: ['wifi', 'tv', 'coffee', 'bath'],
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    description: 'Spacious room with modern amenities and garden view. Features a comfortable king-size bed, work desk, and private bathroom with luxury amenities.',
    features: ['King-size bed', 'Garden view', 'Work desk', 'Mini refrigerator', 'Safe deposit box'],
    rating: 4.8
  },
  {
    roomId: 'RM002',
    name: 'Heritage Suite',
    type: 'suite',
    price: 280,
    maxGuests: 4,
    size: '65 m²',
    amenities: ['wifi', 'tv', 'coffee', 'bath', 'wind', 'car'],
    images: [
      'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    description: 'Luxurious suite with traditional decor and private balcony. Perfect for couples seeking an authentic heritage experience with modern luxury.',
    features: ['Separate living area', 'Private balcony', 'Heritage furniture', 'Jacuzzi', 'Butler service'],
    rating: 4.9
  },
  {
    roomId: 'RM003',
    name: 'Premium Room',
    type: 'premium',
    price: 200,
    maxGuests: 3,
    size: '45 m²',
    amenities: ['wifi', 'tv', 'coffee', 'bath', 'wind'],
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    description: 'Elegant room with premium furnishings and city view. Ideal for business travelers with enhanced comfort and convenience.',
    features: ['City view', 'Premium bedding', 'Ergonomic chair', 'Coffee machine', 'High-speed internet'],
    rating: 4.7
  },
  {
    roomId: 'RM004',
    name: 'Garden Villa',
    type: 'suite',
    price: 350,
    maxGuests: 6,
    size: '85 m²',
    amenities: ['wifi', 'tv', 'coffee', 'bath', 'wind', 'car'],
    images: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    description: 'Spacious villa with private garden and pool access. Perfect for families or groups seeking luxury and privacy.',
    features: ['Private garden', 'Pool access', 'Kitchenette', 'Dining area', 'Multiple bedrooms'],
    rating: 4.9
  },
  {
    roomId: 'RM005',
    name: 'Standard Room',
    type: 'standard',
    price: 120,
    maxGuests: 2,
    size: '28 m²',
    amenities: ['wifi', 'tv', 'coffee', 'bath'],
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    description: 'Comfortable and affordable room with essential amenities. Perfect for budget-conscious travelers.',
    features: ['Queen-size bed', 'Work desk', 'Private bathroom', 'Air conditioning'],
    rating: 4.5
  }
];

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Clear existing rooms
    await Room.deleteMany({});
    
    // Insert sample rooms
    const rooms = await Room.insertMany(sampleRooms);
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: rooms,
      count: rooms.length
    });
    
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}