import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Room from '@/models/Room';

export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    await connectDB();
    
    const room = await Room.findOne({ roomId: params.roomId });
    
    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: room
    });
    
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch room' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    const room = await Room.findOneAndUpdate(
      { roomId: params.roomId },
      body,
      { new: true, runValidators: true }
    );
    
    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: room
    });
    
  } catch (error) {
    console.error('Error updating room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update room' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    await connectDB();
    
    const room = await Room.findOneAndDelete({ roomId: params.roomId });
    
    if (!room) {
      return NextResponse.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Room deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting room:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete room' },
      { status: 500 }
    );
  }
}