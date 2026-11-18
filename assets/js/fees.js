import { getBatch, money } from './batch-data.js';
import { empty, feeLabel } from './batch-finder.js';
import { openDialog } from './dialog.js';
import { escapeHTML } from './site-config.js';
import { academicRecords } from './student-data.js';

// An approved provider can implement the same preview interface when payments are enabled.
const paymentProvider = {
  preview: () =>
    'Online payments are unavailable. The academy must confirm enrollment and provide payment instructions.',
};
const approvedPayments = () =>
  academicRecords.payments.filter(
    (payment) =>
      payment.approved === true &&
      getBatch(payment.batchId) &&
      Number.isFinite(payment.amount) &&
      payment.amount > 0,
  );

function ledger() {
  const payments = approvedPayments();
  return academicRecords.invoices
    .filter(
      (invoice) =>
        invoice.id && getBatch(invoice.batchId) && Number.isFinite(invoice.amount) && invoice.amount > 0,
    )
    .map((invoice) => {
      const paid = payments
        .filter((payment) => payment.invoiceId === invoice.id && payment.batchId === invoice.batchId)
        .reduce((sum, payment) => sum + payment.amount, 0);
      return { ...invoice, paid, balance: Math.max(0, invoice.amount - paid) };
    });
}

export function paymentStatus() {
  const invoices = ledger();
  return {
    balance: invoices.reduce((sum, invoice) => sum + invoice.balance, 0),
    invoiceCount: invoices.length,
  };
}

function feeRecord({ batch, status }, invoices) {
  if (!invoices.length) {
    return `<article class="card"><h3>${batch.title}</h3><p>${feeLabel(batch)} · ${batch.fee.sessions} sessions</p>
      <dl class="meta"><div><dt>Amount due</dt><dd>No confirmed charge</dd></div>
      <div><dt>Payment status</dt><dd>Awaiting confirmation</dd></div></dl>
      <p>${status}</p><div class="actions"><button class="button" type="button" data-payment="${batch.id}">Payment details</button></div></article>`;
  }
  return `<article class="card"><h3>${batch.title}</h3>${invoices
    .map(
      (invoice) => `<dl class="meta">
    <div><dt>Billing period</dt><dd>${escapeHTML(invoice.period || batch.fee.period)}</dd></div>
    <div><dt>Fee amount</dt><dd>${money(invoice.amount)}</dd></div>
    <div><dt>Amount due</dt><dd>${money(invoice.balance)}</dd></div>
    <div><dt>Payment status</dt><dd>${invoice.balance === 0 ? 'Paid' : invoice.paid ? 'Partially paid' : 'Unpaid'}</dd></div>
    ${invoice.dueDate ? `<div><dt>Due date</dt><dd>${escapeHTML(invoice.dueDate)}</dd></div>` : ''}
    </dl>`,
    )
    .join(
      '',
    )}<p>${status}</p><div class="actions"><button class="button" type="button" data-payment="${batch.id}">Payment details</button></div></article>`;
}

export function feesPanel(records) {
  const invoices = ledger();
  const { balance, invoiceCount } = paymentStatus();
  const payments = approvedPayments();
  return `<div class="notice"><strong>${invoiceCount ? money(balance) + ' outstanding' : 'No confirmed charges'}</strong>
    <p>Amounts for local requests are indicative. Charges require academy confirmation.</p></div>
    <div class="dash-list fee-ledger">${
      records.length
        ? records
            .map((record) =>
              feeRecord(
                record,
                invoices.filter((invoice) => invoice.batchId === record.batch.id),
              ),
            )
            .join('')
        : empty(
            'No batches to price',
            'Review a batch and save a request to see its indicative fee here.',
          )
    }</div>
    <h2>Payment history</h2>
    ${
      payments.length
        ? `<div class="dash-list">${payments
            .map(
              (payment) =>
                `<article class="card"><h3>${getBatch(payment.batchId).title}</h3><p>${money(payment.amount)} · ${escapeHTML(payment.date)}</p>
      ${payment.receipt && /^https:\/\//i.test(payment.receipt) ? `<a href="${escapeHTML(payment.receipt)}">View receipt</a>` : ''}</article>`,
            )
            .join('')}</div>`
        : empty(
            'No approved payments',
            'Payment history appears here when the academy records a transaction.',
          )
    }`;
}

export function openPaymentDetails(batchId) {
  const batch = getBatch(batchId);
  if (!batch) return;
  openDialog(
    'Payment details',
    `<h3>${batch.title}</h3><p>${feeLabel(batch)} · Indicative</p>
    <p class="notice">${paymentProvider.preview()}</p>`,
  );
}
