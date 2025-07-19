import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Room from '@/models/Room';
import { 
  generateBookingId, 
  calculateTotalAmount, 
  validateBookingDates,
  isRoomAvailable,
  formatBookingConfirmation
} from '@/lib/utils/booking';
import { sendBookingConfirmationEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let query: any = {};
    
    if (email) {
      query.email = email;
    }
    
    if (status) {
      query.status = status;
    }
    
    const skip = (page - 1) * limit;
    
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Booking.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const {
      name,
      email,
      phone,
      roomId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      specialRequest
    } = body;
    
    // Validate required fields
    if (!name || !email || !phone || !roomId || !checkInDate || !checkOutDate || !numberOfGuests) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Parse dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    // Validate dates
    const dateValidation = validateBookingDates(checkIn, checkOut);
    if (!dateValidation.isValid) {
      return NextResponse.json(
        { success: false, error: dateValidation.error },
        { status: 400 }
      );
    }
    
    // Find room
    const room = await Room.findOne({ roomId, isAvailable: true });
    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found or not available' },
        { status: 404 }
      );
    }
    
    // Check guest capacity
    if (numberOfGuests > room.maxGuests) {
      return NextResponse.json(
        { success: false, error: `Room can accommodate maximum ${room.maxGuests} guests` },
        { status: 400 }
      );
    }
    
    // Check room availability
    const existingBookings = await Booking.find({
      roomId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gt: checkIn }
        }
      ]
    });
    
    if (!isRoomAvailable(existingBookings, checkIn, checkOut)) {
      return NextResponse.json(
        { success: false, error: 'Room is not available for the selected dates' },
        { status: 409 }
      );
    }
    
    // Calculate total amount
    const totalAmount = calculateTotalAmount(room, checkIn, checkOut);
    
    // Create booking
    const booking = new Booking({
      bookingId: generateBookingId(),
      name,
      email,
      phone,
      roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numberOfGuests,
      specialRequest,
      totalAmount
    });
    
    await booking.save();
    
    // Send confirmation emails
    try {
      const emailResult = await sendBookingConfirmationEmail({ booking, room });
      console.log('Email result:', emailResult);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }
    
    // Format confirmation
    const confirmation = formatBookingConfirmation(booking, room);
    
    return NextResponse.json({
      success: true,
      data: booking,
      confirmation,
      message: 'Booking created successfully! Confirmation email sent.'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}