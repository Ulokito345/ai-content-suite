import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        video: {
          include: {
            channel: true
          }
        }
      }
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}