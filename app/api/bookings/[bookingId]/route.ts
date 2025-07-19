import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Room from '@/models/Room';
import { formatBookingConfirmation } from '@/lib/utils/booking';

export async function GET(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    await connectDB();
    
    const booking = await Booking.findOne({ bookingId: params.bookingId });
    
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Get room details
    const room = await Room.findOne({ roomId: booking.roomId });
    
    return NextResponse.json({
      success: true,
      data: booking,
      room: room || null
    });
    
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { status, paymentStatus, paymentMethod } = body;
    
    const updateData: any = {};
    
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (paymentMethod) updateData.paymentMethod = paymentMethod;
    
    const booking = await Booking.findOneAndUpdate(
      { bookingId: params.bookingId },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: booking
    });
    
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    await connectDB();
    
    const booking = await Booking.findOneAndUpdate(
      { bookingId: params.bookingId },
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
    
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}