import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Table from '@/models/Table';

export async function GET(
  request: NextRequest,
  { params }: { params: { tableId: string } }
) {
  try {
    await connectDB();

    const table = await Table.findOne({ tableId: params.tableId });

    if (!table) {
      return NextResponse.json(
        { success: false, error: 'Table not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: table
    });

  } catch (error) {
    console.error('Error fetching table:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch table' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { tableId: string } }
) {
  try {
    await connectDB();

    const body = await request.json();

    const table = await Table.findOneAndUpdate(
      { tableId: params.tableId },
      body,
      { new: true, runValidators: true }
    );

    if (!table) {
      return NextResponse.json(
        { success: false, error: 'Table not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: table
    });

  } catch (error) {
    console.error('Error updating table:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update table' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { tableId: string } }
) {
  try {
    await connectDB();

    const table = await Table.findOneAndDelete({ tableId: params.tableId });

    if (!table) {
      return NextResponse.json(
        { success: false, error: 'Table not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Table deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting table:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete table' },
      { status: 500 }
    );
  }
} 