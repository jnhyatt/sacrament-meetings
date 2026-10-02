'use client';

import { useActionState, useMemo } from 'react';
import MeetingFormFields, { MeetingFormFooter } from '@/components/MeetingFormFields';
import { updateMeeting } from '@/lib/actions';
import { initialState, toFormValues } from '@/lib/meeting-form';
import type { SacramentMeeting } from '@/lib/types';

interface EditMeetingFormProps {
  id: number;
  meeting: SacramentMeeting;
}

export default function EditMeetingForm({ id, meeting }: EditMeetingFormProps) {
  const updateMeetingWithId = updateMeeting.bind(null, id);
  const [state, formAction, isPending] = useActionState(updateMeetingWithId, initialState);
  const defaults = useMemo(() => toFormValues(meeting), [meeting]);

  return (
    <form action={formAction} noValidate aria-describedby="form-message">
      <MeetingFormFields state={state} defaults={defaults} />
      <MeetingFormFooter state={state} isPending={isPending} submitLabel="Save changes" />
    </form>
  );
}
