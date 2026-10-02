'use client';

import { useActionState, useMemo } from 'react';
import MeetingFormFields, { MeetingFormFooter } from '@/components/MeetingFormFields';
import { createMeeting } from '@/lib/actions';
import { emptyFormValues, initialState } from '@/lib/meeting-form';

export default function CreateMeetingForm({ defaultDate }: { defaultDate: string }) {
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);
  const defaults = useMemo(() => emptyFormValues(defaultDate), [defaultDate]);

  return (
    <form action={formAction} noValidate aria-describedby="form-message">
      <MeetingFormFields state={state} defaults={defaults} />
      <MeetingFormFooter state={state} isPending={isPending} submitLabel="Create meeting" />
    </form>
  );
}
