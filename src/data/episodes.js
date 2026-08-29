import { cinematicThumb } from './placeholder'

// Sample episode data. Guests here are illustrative placeholders for the
// design demo — swap names, quotes, and thumbnails for real content.
export const episodes = [
  {
    id: 152,
    number: '#152',
    guest: 'Layla Rahman',
    role: 'Olympic Athlete',
    quote: '“The medal was never the point. Surviving myself was.”',
    duration: '1:12:04',
    views: '2.4M',
    date: 'Aug 2026',
  },
  {
    id: 151,
    number: '#151',
    guest: 'Karim El-Sayed',
    role: 'Founder & Recluse',
    quote: '“I built an empire and forgot to build a home inside it.”',
    duration: '58:31',
    views: '1.8M',
    date: 'Aug 2026',
  },
  {
    id: 150,
    number: '#150',
    guest: 'Noor Haddad',
    role: 'War Correspondent',
    quote: '“You can’t unsee a face. So you carry all of them.”',
    duration: '1:26:47',
    views: '3.1M',
    date: 'Jul 2026',
  },
  {
    id: 149,
    number: '#149',
    guest: 'Dana Okafor',
    role: 'Neurosurgeon',
    quote: '“I hold lives in my hands and still feel like a fraud.”',
    duration: '1:04:19',
    views: '1.2M',
    date: 'Jul 2026',
  },
  {
    id: 148,
    number: '#148',
    guest: 'Yusuf Mansour',
    role: 'Former Convict, Poet',
    quote: '“Prison taught me the one thing freedom never could.”',
    duration: '1:33:52',
    views: '4.0M',
    date: 'Jun 2026',
  },
  {
    id: 147,
    number: '#147',
    guest: 'Salma Ferreira',
    role: 'Grief Counselor',
    quote: '“We don’t move on. We move with. There’s a difference.”',
    duration: '49:08',
    views: '980K',
    date: 'Jun 2026',
  },
]

// Attach generated cinematic thumbnails.
episodes.forEach((ep, i) => {
  ep.thumb = cinematicThumb(i, `EP ${ep.number}`)
})

export const featured = episodes[0]

export const chapters = [
  { t: '00:00', title: 'Cold open — the question no one asks' },
  { t: '04:12', title: 'Childhood, and the weight of a name' },
  { t: '18:45', title: 'The breaking point' },
  { t: '37:20', title: 'Forgiveness, or something like it' },
  { t: '52:03', title: 'What the title hides' },
  { t: '1:05:30', title: 'A message to your younger self' },
]
