import type { NextRequest } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

// GET /api/meetings/:id
export async function GET(_request: NextRequest, ctx: RouteContext<'/api/meetings/[id]'>) {
  const { id } = await ctx.params;

  if (!/^\d+$/.test(id)) {
    return Response.json({ error: 'Meeting id must be a valid number.' }, { status: 400 });
  }

  const meeting = await getMeetingById(Number(id));
  if (!meeting) {
    return Response.json({ error: `Meeting ${id} was not found.` }, { status: 404 });
  }

  return Response.json(meeting);
}
