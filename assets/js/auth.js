import './main.js';
import { brand } from './site-config.js';

document.querySelector('[data-auth-brand]').innerHTML = brand();
const form = document.querySelector('[data-auth]');
const status = document.querySelector('[data-auth-status]');
const password = form.elements.password;
const confirmation = form.elements.confirmation;
function showStatus(message) {
  status.hidden = false;
  status.textContent = message;
}
function validateConfirmation() {
  if (confirmation)
    confirmation.setCustomValidity(
      confirmation.value && confirmation.value !== password.value
        ? 'Enter the same password in both fields.'
        : '',
    );
}
form.addEventListener('input', validateConfirmation);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  validateConfirmation();
  if (!form.reportValidity()) return;
  const name = form.elements['full-name'];
  if (name && !name.value.trim()) {
    name.setCustomValidity('Enter your name.');
    name.reportValidity();
    name.addEventListener('input', () => name.setCustomValidity(''), { once: true });
    return;
  }
  [password, confirmation].filter(Boolean).forEach((input) => {
    input.value = '';
  });
  showStatus(
    confirmation
      ? 'Account creation is unavailable until account services are connected.'
      : 'Online sign-in is unavailable. You can open the Student Dashboard directly.',
  );
});
document.querySelectorAll('[data-password]').forEach((button) => {
  const input = document.getElementById(button.dataset.password);
  button.addEventListener('click', () => {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.textContent = show ? 'Hide' : 'Show';
    button.setAttribute(
      'aria-label',
      `${show ? 'Hide' : 'Show'} ${input.labels[0].textContent.toLowerCase()}`,
    );
  });
});
document
  .querySelector('[data-recovery]')
  ?.addEventListener('click', () =>
    showStatus('Password reset is unavailable until account services are connected.'),
  );
document
  .querySelectorAll('[data-provider]')
  .forEach((button) =>
    button.addEventListener('click', () =>
      showStatus(
        `${button.dataset.provider} sign-in is unavailable. The provider has not been connected.`,
      ),
    ),
  );
