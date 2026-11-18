import './main.js';
import { getBatch } from './batch-data.js';
import { getCourse } from './course-data.js';
import { batchDetails, feeLabel } from './batch-finder.js';
import { openDialog } from './dialog.js';
import { buttonLink, page } from './site-config.js';
import { readWorkspace, saveRequest, studentBatches } from './student-data.js';

function review(batch) {
  const course = getCourse(batch.courseId);
  const exists = studentBatches(readWorkspace()).some((record) => record.batch.id === batch.id);
  const dialog = openDialog(
    'Review enrollment',
    `
    <h3>${batch.title}</h3><p>${course.level} · ${course.weeks} weeks · ${course.format}</p>
    ${batchDetails(batch, false)}
    <p>${feeLabel(batch)} · Indicative</p>
    <p class="notice">This saves a request on this device. Studio confirmation is required to reserve a seat.</p>
    <p role="status" data-enroll-status ${exists ? '' : 'hidden'}>${exists ? 'This batch is already in My Courses & Batches.' : ''}</p>
    <div class="actions">
      ${exists ? '' : '<button type="button" class="button accent" data-save-request>Save enrollment request</button>'}
      ${buttonLink('Open My Courses', page('dashboard') + '#my-courses')}
    </div>`,
  );
  dialog.querySelector('[data-save-request]')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    const status = dialog.querySelector('[data-enroll-status]');
    status.hidden = false;
    try {
      const result = await saveRequest(batch.id);
      status.textContent =
        result === 'saved'
          ? 'Enrollment request saved on this device.'
          : 'This batch is already in My Courses & Batches.';
    } catch {
      button.disabled = false;
      status.textContent =
        'This browser could not save your request. Check that website storage is available.';
    }
  });
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-enroll]');
  const batch = button && getBatch(button.dataset.enroll);
  if (batch) review(batch);
});
