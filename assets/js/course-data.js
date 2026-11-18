export const groups = ['Kids', 'Teens', 'Adults'];
export const levels = ['Beginner', 'Intermediate', 'Advanced'];

export const instruments = [
  {
    id: 'guitar',
    name: 'Guitar',
    headline: 'Find your first chord.',
    description: 'From clean chord changes to playing with a band, build a style that feels like yours.',
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
    headline: 'Make the keys yours.',
    description: 'Bring melody and harmony together as you grow comfortable playing with both hands.',
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
    headline: 'Let your voice come through.',
    description: 'Develop a reliable technique and get comfortable expressing yourself through song.',
    topics: [
      'Breathing & vocal technique',
      'Pitch awareness & ear training',
      'Interpretation & performance',
    ],
    image: 'vocals',
    alt: 'A vocalist practices at a studio microphone',
    mentor: 'Maya Fernandes',
    mentorImage: 'voice-lesson',
    approach: 'Start with comfortable warm-ups and use songs that suit your range to work on phrasing.',
  },
  {
    id: 'drums',
    name: 'Drums',
    headline: 'Get into the groove.',
    description:
      'Learn to keep time, coordinate your limbs, and listen for how your part fits into a group.',
    topics: ['Timing & rudiments', 'Groove & coordination', 'Fills & group rhythm'],
    image: 'drums',
    alt: 'A drummer plays a full kit under warm lighting',
    mentor: 'Kabir Sen',
    mentorImage: 'drum-detail',
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
