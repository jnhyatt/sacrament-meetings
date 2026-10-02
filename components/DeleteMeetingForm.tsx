'use client';

import { deleteMeeting } from '@/lib/actions';

export default function DeleteMeetingForm({ id, label }: { id: number; label: string }) {
  return (
    <form
      action={deleteMeeting}
      onSubmit={(event) => {
        if (!window.confirm(`Delete the meeting on ${label}? This cannot be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label={`Delete meeting on ${label}`}
        className="text-danger hover:underline"
      >
        Delete
      </button>
    </form>
  );
}
