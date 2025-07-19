import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    await connectDB();

    const blog = await Blog.findOne({ blogId: params.blogId });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Increment views if published
    if (blog.isPublished) {
      await Blog.findOneAndUpdate(
        { blogId: params.blogId },
        { $inc: { views: 1 } }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog
    });

  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    await connectDB();

    const body = await request.json();

    // Generate new slug if title changed
    if (body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Set publishedAt if publishing for the first time
    if (body.isPublished) {
      const existingBlog = await Blog.findOne({ blogId: params.blogId });
      if (existingBlog && !existingBlog.isPublished) {
        body.publishedAt = new Date();
      }
    }

    const blog = await Blog.findOneAndUpdate(
      { blogId: params.blogId },
      body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog
    });

  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  try {
    await connectDB();

    const blog = await Blog.findOneAndDelete({ blogId: params.blogId });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 