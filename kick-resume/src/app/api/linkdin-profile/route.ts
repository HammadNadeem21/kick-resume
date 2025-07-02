// File: /app/api/linkedin-profile/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { linkedinUrl } = await req.json();

    if (!linkedinUrl) {
      return NextResponse.json({ error: 'LinkedIn URL is required' }, { status: 400 });
    }

    const proxycurlRes = await fetch('https://nubela.co/proxycurl/api/v2/linkedin', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PROXYCURL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Optional: cache revalidation
      body: JSON.stringify({
        url: linkedinUrl,
      }),
    });

    if (!proxycurlRes.ok) {
      const err = await proxycurlRes.json();
      return NextResponse.json({ error: err.message || 'Proxycurl API error' }, { status: proxycurlRes.status });
    }

    const data = await proxycurlRes.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('LinkedIn Fetch Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
