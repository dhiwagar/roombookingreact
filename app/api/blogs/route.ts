import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET a specific blog by blogId
export async function GET(request: NextRequest, { params }: { params: { blogId: string } }) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ blogId: params.blogId }).lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PATCH to update a specific blog
export async function PATCH(request: NextRequest, { params }: { params: { blogId: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const blog = await Blog.findOneAndUpdate(
      { blogId: params.blogId },
      { $set: { ...body, slug: body.title ? body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined } },
      { new: true }
    ).lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE a specific blog
export async function DELETE(request: NextRequest, { params }: { params: { blogId: string } }) {
  try {
    await connectDB();
    const blog = await Blog.findOneAndDelete({ blogId: params.blogId }).lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}