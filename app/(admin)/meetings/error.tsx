'use client';

import MeetingsError, { type MeetingsErrorProps } from '@/components/MeetingsError';

export default function Error(props: MeetingsErrorProps) {
  return <MeetingsError {...props} />;
}
