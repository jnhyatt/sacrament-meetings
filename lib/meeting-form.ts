import type { MeetingType, SacramentMeeting } from './types';

export interface SpeakerFormValues {
  name: string;
  topic: string;
  type: string;
}

export interface MeetingFormValues {
  date: string;
  meetingType: string;
  presiding: string;
  conducting: string;
  announcements: string;
  openingHymnNumber: string;
  openingHymnTitle: string;
  openingPrayer: string;
  wardBusiness: string;
  stakeBusiness: boolean;
  sacramentHymnNumber: string;
  sacramentHymnTitle: string;
  speakers: SpeakerFormValues[];
  closingHymnNumber: string;
  closingHymnTitle: string;
  closingPrayer: string;
}

// Cool feature I learned about: this type represents any key in `MeetingFormValues`.
export type MeetingFormField = keyof MeetingFormValues;

export interface State {
  message: string | null;
  errors: Partial<Record<MeetingFormField, string[]>>;
  values?: MeetingFormValues;
}

export const initialState: State = { message: null, errors: {} };

export function toFormValues(meeting: SacramentMeeting): MeetingFormValues {
  return {
    date: meeting.date,
    meetingType: meeting.meetingType,
    presiding: meeting.presiding,
    conducting: meeting.conducting,
    announcements: (meeting.announcements ?? []).join('\n'),
    openingHymnNumber: String(meeting.openingHymn.number),
    openingHymnTitle: meeting.openingHymn.title,
    openingPrayer: meeting.openingPrayer,
    wardBusiness: meeting.wardBusiness.map((item) => item.description).join('\n'),
    stakeBusiness: meeting.stakeBusiness,
    sacramentHymnNumber: String(meeting.sacramentHymn.number),
    sacramentHymnTitle: meeting.sacramentHymn.title,
    speakers: meeting.speakers.map(({ name, topic, type }) => ({ name, topic, type })),
    closingHymnNumber: String(meeting.closingHymn.number),
    closingHymnTitle: meeting.closingHymn.title,
    closingPrayer: meeting.closingPrayer,
  };
}

export function emptyFormValues(
  date: string,
  meetingType: MeetingType = 'regular'
): MeetingFormValues {
  return {
    date,
    meetingType,
    presiding: '',
    conducting: '',
    announcements: '',
    openingHymnNumber: '',
    openingHymnTitle: '',
    openingPrayer: '',
    wardBusiness: '',
    stakeBusiness: false,
    sacramentHymnNumber: '',
    sacramentHymnTitle: '',
    speakers: [],
    closingHymnNumber: '',
    closingHymnTitle: '',
    closingPrayer: '',
  };
}
