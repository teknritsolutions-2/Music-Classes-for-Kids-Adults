export const groups = ['Kids', 'Teens', 'Adults'];
export const levels = ['Beginner', 'Intermediate', 'Advanced'];

export const instruments = [
  {
    id: 'guitar',
    name: 'Guitar',
    headline: 'What you’ll practice on guitar',
    description:
      'Learn to change chords smoothly, keep time while strumming, and play songs with others.',
    topics: ['Chord shapes & finger placement', 'Rhythm & strumming', 'Melody & ensemble playing'],
    image: 'guitar',
    alt: 'An adult guides a young acoustic guitar player',
    mentor: 'Aarav Mehta',
    mentorImage: 'journey',
    approach:
      'Build a steady rhythm with short, focused exercises, then put those skills to work in a song.',
  },
  {
    id: 'keyboard',
    name: 'Keyboard / Piano',
    headline: 'What you’ll practice on keyboard',
    description: 'Start with notes and simple melodies, then add chords and play with both hands.',
    topics: ['Notes & scales', 'Hand coordination', 'Harmony & simple arrangements'],
    image: 'keyboard',
    alt: 'An instructor guides a learner’s hands on a keyboard',
    mentor: 'Leena Rao',
    mentorImage: 'keyboard',
    approach:
      'Practice each hand separately, then put the parts together in an arrangement you can play at a comfortable tempo.',
  },
  {
    id: 'vocals',
    name: 'Vocals',
    headline: 'What you’ll practice in vocal lessons',
    description: 'Warm up your voice, practice staying in tune, and work on songs that suit your range.',
    topics: [
      'Breathing & vocal technique',
      'Pitch awareness & ear training',
      'Interpretation & performance',
    ],
    image: 'vocals',
    alt: 'A vocalist practices at a studio microphone',
    mentor: 'Maya Fernandes',
    mentorImage: 'vocals',
    approach: 'Start with comfortable warm-ups and use songs that suit your range to work on phrasing.',
  },
  {
    id: 'drums',
    name: 'Drums',
    headline: 'What you’ll practice on drums',
    description:
      'Start with a steady beat, add fills, and learn to keep time while playing with others.',
    topics: ['Timing & rudiments', 'Groove & coordination', 'Fills & group rhythm'],
    image: 'drums',
    alt: 'A drummer plays a full kit under warm lighting',
    mentor: 'Kabir Sen',
    mentorImage: 'drum-lesson',
    approach:
      'Break grooves into their component parts, then practice moving between patterns and fills without losing the beat.',
  },
];

export const getInstrument = (id) => instruments.find((instrument) => instrument.id === id);
export const instrumentLabel = (instrument) =>
  instrument.id === 'keyboard' ? 'Keyboard' : instrument.name;

const levelFocus = [
  'Learn the fundamentals and work through a short piece at a comfortable pace.',
  'Refine technique and timing while building a varied repertoire.',
  'Explore interpretation, more demanding arrangements, and ensemble dynamics.',
];

export const courses = instruments.flatMap((instrument) =>
  groups.flatMap((group) =>
    levels.map((level, index) => ({
      id: `${instrument.id}-${group.toLowerCase()}-${level.toLowerCase()}`,
      instrument: instrument.id,
      group,
      level,
      weeks: [8, 10, 12][index],
      focus: levelFocus[index],
      format: 'Small-group studio lessons',
    })),
  ),
);
export const getCourse = (id) => courses.find((course) => course.id === id);
