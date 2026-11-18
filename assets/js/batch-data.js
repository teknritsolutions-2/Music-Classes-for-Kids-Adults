import { courses, getCourse, getInstrument } from './course-data.js';

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const timePreferences = ['Morning', 'Afternoon', 'Evening'];
const schedules = [
  { day: 'Saturday', start: '10:00', end: '10:50', preference: 'Morning' },
  { day: 'Tuesday', start: '16:00', end: '16:50', preference: 'Afternoon' },
  { day: 'Thursday', start: '16:00', end: '17:00', preference: 'Afternoon' },
  { day: 'Wednesday', start: '17:00', end: '17:50', preference: 'Afternoon' },
  { day: 'Friday', start: '17:00', end: '17:50', preference: 'Afternoon' },
  { day: 'Saturday', start: '15:00', end: '16:00', preference: 'Afternoon' },
  { day: 'Sunday', start: '11:00', end: '11:50', preference: 'Morning' },
  { day: 'Tuesday', start: '18:30', end: '19:20', preference: 'Evening' },
  { day: 'Thursday', start: '19:00', end: '20:00', preference: 'Evening' },
];
const blockFees = {
  guitar: [2800, 3200, 3600],
  keyboard: [3000, 3400, 3800],
  vocals: [2800, 3200, 3600],
  drums: [3200, 3600, 4000],
};
const minutes = (time) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
export const batches = courses.map((course, index) => {
  const schedule = schedules[index % schedules.length];
  return {
    id: `batch-${course.id}`,
    courseId: course.id,
    title: `${getInstrument(course.instrument).name} · ${course.group}`,
    ...schedule,
    duration: minutes(schedule.end) - minutes(schedule.start),
    fee: { amount: blockFees[course.instrument][index % 3], sessions: 4, period: '4-session block' },
  };
});
export const getBatch = (id) => batches.find((batch) => batch.id === id);
export const money = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
export const batchTime = (batch) => `${batch.start}–${batch.end} IST`;
export const fitsCourse = (course, filters) =>
  ['instrument', 'group', 'level'].every((key) => !filters[key] || filters[key] === course[key]);
export const fitsBatch = (batch, filters) =>
  fitsCourse(getCourse(batch.courseId), filters) &&
  (!filters.day || filters.day === batch.day) &&
  (!filters.preference || filters.preference === batch.preference);
