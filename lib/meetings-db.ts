import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-06',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Nguyen',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Sister Taylor',
    wardBusiness: [
      { description: 'Release of Brother Clark as Sunday School teacher' },
      { description: 'Confirmation of Emma Johnson' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [],
    closingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
    closingPrayer: 'Brother Martinez',
    announcements: ['Fast offering envelopes are available in the foyer'],
  },
  {
    id: 2,
    date: '2026-09-13',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Brother Wilson',
    wardBusiness: [{ description: 'Sustaining of Sister Lee as Relief Society secretary' }],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [
      { name: 'Brother Anderson', topic: 'Ministering as the Savior Did', type: 'speaker' },
      { name: 'Sister Anderson', topic: 'Serving in Our Families', type: 'speaker' },
      {
        name: 'Olivia Harris (violin)',
        topic: 'Come, Thou Fount of Every Blessing',
        type: 'musical-number',
      },
      { name: 'Brother Thomas', topic: 'Charity Never Faileth', type: 'speaker' },
    ],
    closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
    closingPrayer: 'Sister Robinson',
  },
  {
    id: 3,
    date: '2026-09-20',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Nguyen',
    openingHymn: { number: 27, title: 'Praise to the Man' },
    openingPrayer: 'Sister Garcia',
    wardBusiness: [
      { description: 'Sustaining of Brother Kim as Young Men adviser' },
      { description: 'Ordination of Liam Walker to the office of priest' },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      { name: 'Liam Walker', topic: 'Preparing to Serve a Mission', type: 'speaker' },
      { name: 'Primary Children', topic: 'I Love to See the Temple', type: 'musical-number' },
      { name: 'Sister Hall', topic: 'The Blessings of Temple Worship', type: 'speaker' },
      { name: 'Brother Young', topic: 'Covenant Paths', type: 'speaker' },
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Brother Allen',
    announcements: [
      'Stake youth dance: Friday, September 25 at 7:00 PM',
      'Ward choir practice after the block in the chapel',
    ],
  },
  {
    id: 4,
    date: '2026-09-27',
    meetingType: 'regular',
    presiding: 'Brother Jones, First Counselor',
    conducting: 'Brother Jones',
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Sister King',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      { name: 'Sister Wright', topic: 'Preparing for General Conference', type: 'speaker' },
      { name: 'Brother Scott', topic: 'Listening to Living Prophets', type: 'speaker' },
    ],
    closingHymn: { number: 21, title: 'Come, Listen to a Prophet’s Voice' },
    closingPrayer: 'Sister Green',
  },
  {
    id: 5,
    date: '2026-10-11',
    meetingType: 'stake',
    presiding: 'President Adams, Stake President',
    conducting: 'President Baker, First Counselor',
    openingHymn: { number: 6, title: 'Redeemer of Israel' },
    openingPrayer: 'Sister Nelson',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    speakers: [
      {
        name: 'Sister Carter, Stake Relief Society President',
        topic: 'Strengthening Families',
        type: 'speaker',
      },
      { name: 'Stake Choir', topic: 'Consider the Lilies', type: 'musical-number' },
      { name: 'President Adams', topic: 'Gathering Israel', type: 'speaker' },
    ],
    closingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    closingPrayer: 'Brother Mitchell',
    announcements: ['Stake conference is held at the stake center; no ward meetings today'],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}
