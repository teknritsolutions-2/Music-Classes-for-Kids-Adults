import { icon } from './site-config.js';

export function openDialog(title, content) {
  const dialog = document.createElement('dialog');
  dialog.className = 'modal';
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  dialog.innerHTML = `<div class="modal-head"><h2 id="dialog-title">${title}</h2>
    <button type="button" class="icon-button" data-close aria-label="Close dialog" autofocus>${icon('close')}</button></div>
    <div class="modal-body">${content}</div>`;
  document.body.append(dialog);
  dialog.addEventListener('close', () => dialog.remove(), { once: true });
  dialog.showModal();
  return dialog;
}
