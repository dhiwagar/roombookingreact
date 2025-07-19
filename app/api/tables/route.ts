import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Table from '@/models/Table';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const location = searchParams.get('location');
    const isAvailable = searchParams.get('isAvailable');

    let query: any = {};

    if (location) {
      query.location = location;
    }

    if (isAvailable !== null && isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true';
    }

    const skip = (page - 1) * limit;

    const tables = await Table.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Table.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: tables,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching tables:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tables' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Generate table ID
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    const tableId = `TBL-${timestamp}-${randomStr}`.toUpperCase();

    const table = new Table({
      ...body,
      tableId
    });

    await table.save();

    return NextResponse.json({
      success: true,
      data: table
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating table:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create table' },
      { status: 500 }
    );
  }
} 