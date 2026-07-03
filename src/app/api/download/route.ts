import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('file');
  const fileName = searchParams.get('name') || 'preset.dng';

  if (!filePath) {
    return NextResponse.json({ error: 'Missing file parameter' }, { status: 400 });
  }

  // Only allow files from our own API domain for security
  const fileUrl = `https://api.devkayy.in/${filePath}`;

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const buffer = await response.arrayBuffer();

    // Force download with Content-Disposition: attachment
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}.dng"`,
        'Content-Length': buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}
