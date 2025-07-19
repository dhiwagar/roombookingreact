import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Room from '@/models/Room';
import Booking from '@/models/Booking';
import { isRoomAvailable } from '@/lib/utils/booking';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const isAvailable = searchParams.get('isAvailable');
    const search = searchParams.get('search');

    let query: any = {};

    // For admin dashboard, don't filter by availability by default
    if (isAvailable !== null && isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true';
    } else if (!checkIn && !checkOut) {
      // For public room listing, only show available rooms
      query.isAvailable = true;
    }

    if (guests) {
      query.maxGuests = { $gte: parseInt(guests) };
    }

    if (type) {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { roomId: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const rooms = await Room.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Room.countDocuments(query);

    // If dates are provided, filter out unavailable rooms
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const availableRooms = [];

      for (const room of rooms) {
        const existingBookings = await Booking.find({
          roomId: room.roomId,
          status: { $ne: 'cancelled' },
          $or: [
            {
              checkInDate: { $lt: checkOutDate },
              checkOutDate: { $gt: checkInDate }
            }
          ]
        });

        if (isRoomAvailable(existingBookings, checkInDate, checkOutDate)) {
          availableRooms.push(room);
        }
      }

      return NextResponse.json({
        success: true,
        data: availableRooms,
        count: availableRooms.length,
        pagination: {
          page,
          limit,
          total: availableRooms.length,
          pages: Math.ceil(availableRooms.length / limit)
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: rooms,
      count: rooms.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Generate room ID
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    const roomId = `RM-${timestamp}-${randomStr}`.toUpperCase();

    const room = new Room({
      ...body,
      roomId
    });

    await room.save();

    return NextResponse.json({
      success: true,
      data: room
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create room' },
      { status: 500 }
    );
  }
}