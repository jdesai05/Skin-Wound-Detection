import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function handler(req: NextRequest) {
  const path = req.nextUrl.pathname.replace('/api', '');
  const url = `${baseUrl}${path}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  // Remove host header as it might cause issues with proxying
  headers.delete('host');

  const requestOptions: RequestInit = {
    method: req.method,
    headers: headers,
    // For GET and HEAD requests, body should not be included
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
    // duplex option is required when sending a body with Node.js fetch
    ...(req.method !== 'GET' && req.method !== 'HEAD' && req.body ? { duplex: 'half' } : {}),
  };

  try {
    const response = await fetch(url, requestOptions);

    // Reconstruct the response to be returned by the Next.js API route
    const responseHeaders = new Headers(response.headers);
    // Remove content-encoding header if it's gzip, as Next.js handles compression
    if (responseHeaders.get('content-encoding') === 'gzip') {
      responseHeaders.delete('content-encoding');
    }

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Proxy error:', error);
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
