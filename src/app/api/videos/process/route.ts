import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    // Buscar el video
    const video = await prisma.video.findUnique({
      where: { videoId },
      include: { channel: true }
    });

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    const youtubeApiUrl = process.env.YOUTUBE_API_URL;
    if (!youtubeApiUrl) {
      return NextResponse.json(
        { error: 'YouTube API URL not configured' },
        { status: 500 }
      );
    }

    // Obtener transcripción del video
    const transcriptResponse = await fetch(`${youtubeApiUrl}/get-transcript`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_id: videoId,
        language: video.channel?.language || 'en'
      })
    });

    if (!transcriptResponse.ok) {
      const error = await transcriptResponse.json();
      return NextResponse.json(
        { error: error.detail || 'Could not get transcript' },
        { status: 400 }
      );
    }

    const transcriptData = await transcriptResponse.json();

    // Actualizar video con transcripción
    const updatedVideo = await prisma.video.update({
      where: { id: video.id },
      data: {
        transcriptRaw: transcriptData.transcript_raw,
        transcriptClean: transcriptData.transcript_clean
      }
    });

    // Analizar contenido con IA
    const analyzeResponse = await fetch(`${request.nextUrl.origin}/api/analyze-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId })
    });

    if (!analyzeResponse.ok) {
      // Si falla el análisis, al menos tenemos la transcripción
      return NextResponse.json({
        success: true,
        video: updatedVideo,
        message: 'Transcript obtained, but analysis failed'
      });
    }

    const analysisResult = await analyzeResponse.json();

    return NextResponse.json({
      success: true,
      video: analysisResult.video,
      analysis: analysisResult.analysis,
      message: 'Video processed successfully'
    });

  } catch (error) {
    console.error('Error processing video:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}