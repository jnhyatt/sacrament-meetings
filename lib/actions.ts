'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import * as db from './meetings-db';
import type { MeetingFormValues, State } from './meeting-form';

const requiredText = (message: string) => z.string().trim().min(1, message);

const lines = z.string().transform((value) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
);

const hymnNumber = (label: string) =>
  z.coerce
    .number({ error: `Please enter the ${label} number.` })
    .int(`The ${label} number must be a whole number.`)
    .min(1, `Please enter the ${label} number.`);

const MeetingFormSchema = z
  .object({
    date: z.iso.date('Please choose a meeting date.'),
    meetingType: z.enum(['regular', 'testimony', 'stake', 'general'], {
      error: 'Please select a meeting type.',
    }),
    presiding: requiredText('Please enter who is presiding.'),
    conducting: requiredText('Please enter who is conducting.'),
    announcements: lines,
    openingHymnNumber: hymnNumber('opening hymn'),
    openingHymnTitle: requiredText('Please enter the opening hymn title.'),
    openingPrayer: requiredText('Please enter who will give the invocation.'),
    wardBusiness: lines,
    stakeBusiness: z.boolean(),
    sacramentHymnNumber: hymnNumber('sacrament hymn'),
    sacramentHymnTitle: requiredText('Please enter the sacrament hymn title.'),
    speakers: z.array(
      z.object({
        name: requiredText('Please enter a name for every speaker and musical number.'),
        topic: z.string().trim(),
        type: z.enum(['speaker', 'musical-number'], {
          error: 'Please choose speaker or musical number for every program item.',
        }),
      })
    ),
    closingHymnNumber: hymnNumber('closing hymn'),
    closingHymnTitle: requiredText('Please enter the closing hymn title.'),
    closingPrayer: requiredText('Please enter who will give the benediction.'),
  })
  .transform((form): db.MeetingInput => ({
    date: form.date,
    meetingType: form.meetingType,
    presiding: form.presiding,
    conducting: form.conducting,
    announcements: form.announcements,
    openingHymn: { number: form.openingHymnNumber, title: form.openingHymnTitle },
    openingPrayer: form.openingPrayer,
    wardBusiness: form.wardBusiness.map((description) => ({ description })),
    stakeBusiness: form.stakeBusiness,
    sacramentHymn: { number: form.sacramentHymnNumber, title: form.sacramentHymnTitle },
    speakers: form.speakers,
    closingHymn: { number: form.closingHymnNumber, title: form.closingHymnTitle },
    closingPrayer: form.closingPrayer,
  }));

const MeetingIdSchema = z.coerce.number().int().positive();

function readFormValues(formData: FormData): MeetingFormValues {
  const text = (name: string) => {
    const value = formData.get(name);
    return typeof value === 'string' ? value : '';
  };
  const all = (name: string) => formData.getAll(name).map((value) => String(value));
  const topics = all('speakerTopic');
  const types = all('speakerType');

  return {
    date: text('date'),
    meetingType: text('meetingType'),
    presiding: text('presiding'),
    conducting: text('conducting'),
    announcements: text('announcements'),
    openingHymnNumber: text('openingHymnNumber'),
    openingHymnTitle: text('openingHymnTitle'),
    openingPrayer: text('openingPrayer'),
    wardBusiness: text('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymnNumber: text('sacramentHymnNumber'),
    sacramentHymnTitle: text('sacramentHymnTitle'),
    speakers: all('speakerName').map((name, i) => ({
      name,
      topic: topics[i] ?? '',
      type: types[i] ?? '',
    })),
    closingHymnNumber: text('closingHymnNumber'),
    closingHymnTitle: text('closingHymnTitle'),
    closingPrayer: text('closingPrayer'),
  };
}

function validationFailed(values: MeetingFormValues, error: z.ZodError): State {
  const { fieldErrors } = z.flattenError(error);
  const errors: State['errors'] = {};
  for (const [field, messages] of Object.entries(fieldErrors)) {
    errors[field as keyof State['errors']] = [...new Set(messages as string[])];
  }
  return {
    message: 'Some fields need attention. Please correct them and try again.',
    errors,
    values,
  };
}

function isDuplicateDate(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === '23505' &&
    'constraint' in error &&
    error.constraint === 'meetings_date_key'
  );
}

function duplicateDate(values: MeetingFormValues): State {
  return {
    message: 'Some fields need attention. Please correct them and try again.',
    errors: { date: ['Another meeting is already scheduled on this date.'] },
    values,
  };
}

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
  const values = readFormValues(formData);
  const validated = MeetingFormSchema.safeParse(values);
  if (!validated.success) {
    return validationFailed(values, validated.error);
  }

  try {
    await db.createMeeting(validated.data);
  } catch (error) {
    if (isDuplicateDate(error)) {
      return duplicateDate(values);
    }
    console.error('Failed to create meeting:', error);
    throw new Error('We couldn’t save the new meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const meetingId = MeetingIdSchema.safeParse(id);
  if (!meetingId.success) {
    return { message: 'This meeting could not be found.', errors: {} };
  }

  const values = readFormValues(formData);
  const validated = MeetingFormSchema.safeParse(values);
  if (!validated.success) {
    return validationFailed(values, validated.error);
  }

  let updated: boolean;
  try {
    updated = await db.updateMeeting(meetingId.data, validated.data);
  } catch (error) {
    if (isDuplicateDate(error)) {
      return duplicateDate(values);
    }
    console.error(`Failed to update meeting ${meetingId.data}:`, error);
    throw new Error('We couldn’t save your changes to this meeting. Please try again.');
  }
  if (!updated) {
    return {
      message: 'This meeting no longer exists. It may have been deleted.',
      errors: {},
      values,
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${meetingId.data}`);
  redirect('/meetings');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const meetingId = MeetingIdSchema.safeParse(formData.get('id'));
  if (!meetingId.success) {
    throw new Error('That meeting could not be found.');
  }

  try {
    await db.deleteMeeting(meetingId.data);
  } catch (error) {
    console.error(`Failed to delete meeting ${meetingId.data}:`, error);
    throw new Error('We couldn’t delete this meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${meetingId.data}`);
}
