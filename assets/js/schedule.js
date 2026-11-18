import { batchTime, days } from './batch-data.js';

const zone = 'Asia/Kolkata';
const dateParts = new Intl.DateTimeFormat('en-GB', {
  timeZone: zone,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});
const output = new Intl.DateTimeFormat('en-IN', {
  timeZone: zone,
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

export function nextSession(batch, now = new Date()) {
  const values = Object.fromEntries(
    dateParts.formatToParts(now).map(({ type, value }) => [type, Number(value)]),
  );
  const localMidnight = Date.UTC(values.year, values.month - 1, values.day);
  const weekday = (new Date(localMidnight).getUTCDay() + 6) % 7;
  const ahead = (days.indexOf(batch.day) - weekday + 7) % 7;
  const [hours, minutes] = batch.start.split(':').map(Number);
  const start = localMidnight + (ahead * 1440 + hours * 60 + minutes - 330) * 60000;
  return new Date(start > now ? start : start + 7 * 86400000);
}

export const formatSession = (date) => output.format(date);
export const upcomingSessions = (records) =>
  records
    .map((record) => ({ ...record, date: nextSession(record.batch) }))
    .sort((a, b) => a.date - b.date);
export const scheduleLine = (batch) => `${batch.day} · <span class="time">${batchTime(batch)}</span>`;
