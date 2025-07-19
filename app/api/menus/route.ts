import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Menu from '@/models/Menu';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const isAvailable = searchParams.get('isAvailable');
    const isVegetarian = searchParams.get('isVegetarian');
    const search = searchParams.get('search');

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (isAvailable !== null && isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true';
    }

    if (isVegetarian !== null && isVegetarian !== undefined) {
      query.isVegetarian = isVegetarian === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { ingredients: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const skip = (page - 1) * limit;

    const menus = await Menu.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Menu.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: menus,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching menus:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menus' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Generate menu ID
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    const menuId = `MENU-${timestamp}-${randomStr}`.toUpperCase();

    const menu = new Menu({
      ...body,
      menuId
    });

    await menu.save();

    return NextResponse.json({
      success: true,
      data: menu
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create menu' },
      { status: 500 }
    );
  }
} 