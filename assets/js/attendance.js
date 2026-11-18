import { getBatch } from './batch-data.js';
import { empty } from './batch-finder.js';
import { escapeHTML } from './site-config.js';
import { academicRecords } from './student-data.js';

export function attendanceSummary() {
  const records = academicRecords.attendance.filter(
    (record) => getBatch(record.batchId) && ['Attended', 'Missed'].includes(record.status),
  );
  const attended = records.filter((record) => record.status === 'Attended').length;
  return {
    records,
    attended,
    missed: records.length - attended,
    percent: records.length ? Math.round((attended / records.length) * 100) : null,
  };
}

export function attendancePanel() {
  const { records, attended, missed, percent } = attendanceSummary();
  return `<div class="dash-metrics">
    <div class="card"><strong>${records.length}</strong><p>Recorded sessions</p></div>
    <div class="card"><strong>${attended}</strong><p>Attended</p></div>
    <div class="card"><strong>${missed}</strong><p>Missed</p></div>
    <div class="card"><strong>${percent === null ? '—' : percent + '%'}</strong><p>Attendance</p></div>
  </div>
  ${
    records.length
      ? `<div class="dash-list">${records.map((record) => `<article class="card"><h3>${getBatch(record.batchId).title}</h3><p>${escapeHTML(record.date)} · ${record.status}</p></article>`).join('')}</div>`
      : empty(
          'No recorded attendance',
          'Attendance appears here after the academy records sessions for a confirmed batch.',
        )
  }`;
}
