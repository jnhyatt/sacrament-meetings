import type { NextRequest } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/meetings?date=YYYY-MM-DD
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');

  if (date !== null && !ISO_DATE.test(date)) {
    return Response.json(
      { error: 'The date parameter must be formatted as YYYY-MM-DD.' },
      { status: 400 }
    );
  }

  return Response.json(await getMeetings({ date }));
}
