import './main.js';
import { openDialog } from './dialog.js';
import { escapeHTML } from './site-config.js';

document.querySelector('[data-contact]').addEventListener('submit', (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  if (!values.name.trim() || !values.message.trim()) {
    const field = event.currentTarget.elements[!values.name.trim() ? 'name' : 'message'];
    field.setCustomValidity('Enter some text before continuing.');
    field.reportValidity();
    field.addEventListener('input', () => field.setCustomValidity(''), { once: true });
    return;
  }
  const { name, email, topic, message } = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, escapeHTML(value.trim())]),
  );
  const dialog = openDialog(
    'Review your enquiry',
    `<p class="notice">This draft is on your device. Your enquiry has not been sent.</p>
    <dl class="meta"><div><dt>Name</dt><dd>${name}</dd></div><div><dt>Email</dt><dd><bdi>${email}</bdi></dd></div>
    <div><dt>Topic</dt><dd>${topic}</dd></div></dl><p class="draft-message">${message}</p>
    <div class="actions"><button type="button" class="button accent" data-download>Download draft</button><button type="button" class="button" data-close>Edit enquiry</button></div>`,
  );
  dialog.querySelector('[data-download]').addEventListener('click', () => {
    const blob = new Blob(
      [
        `UPBEAT enquiry draft\n\nName: ${values.name}\nEmail: ${values.email}\nTopic: ${values.topic}\n\n${values.message}\n`,
      ],
      { type: 'text/plain;charset=utf-8' },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'upbeat-enquiry.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
});
