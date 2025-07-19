import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Menu from '@/models/Menu';

export async function GET(
  request: NextRequest,
  { params }: { params: { menuId: string } }
) {
  try {
    await connectDB();

    const menu = await Menu.findOne({ menuId: params.menuId });

    if (!menu) {
      return NextResponse.json(
        { success: false, error: 'Menu not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: menu
    });

  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { menuId: string } }
) {
  try {
    await connectDB();

    const body = await request.json();

    const menu = await Menu.findOneAndUpdate(
      { menuId: params.menuId },
      body,
      { new: true, runValidators: true }
    );

    if (!menu) {
      return NextResponse.json(
        { success: false, error: 'Menu not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: menu
    });

  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update menu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { menuId: string } }
) {
  try {
    await connectDB();

    const menu = await Menu.findOneAndDelete({ menuId: params.menuId });

    if (!menu) {
      return NextResponse.json(
        { success: false, error: 'Menu not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Menu deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete menu' },
      { status: 500 }
    );
  }
} 