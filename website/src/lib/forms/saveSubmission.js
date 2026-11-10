// Server-only; do not import from public scripts or Sanity Studio modules.
import process from 'node:process';
import {FORMS} from './config.js';
import {getSubmittedDate} from './date.js';
import {getWriteClient} from '../../sanity/lib/writeClient.js';

const formLabels = Object.freeze({
  enquiry: 'enquiry',
  homepage: 'enquiry',
  contact: 'enquiry',
  'quote-popup': 'enquiry',
  'Enquiry / Get a Quote': 'enquiry',
  'Get a Quote': 'enquiry'
});
const coreFields = new Set([
  'formType', 'formId', 'formLabel', 'formSource', 'formName',
  'name', 'email', 'phone', 'message', 'sourcePage', 'sourcePath',
  'extraFields', 'honeypotFields', 'submittedAt', 'submittedDate', 'status'
]);
const privateFields = new Set([
  'hp', 'honey', 'honeypot', 'honeypotfields', 'website', 'companyurl',
  'botfield', 'gotcha', 'fax', 'faxnumber', 'confirmemail',
  'password', 'token', 'apikey', 'secret', 'sanitywritetoken', 'sanityapitoken'
]);
const keyName = value => value.toLowerCase().replace(/[^a-z0-9]/g, '');

function text(value, limit) {
  return ['string', 'number', 'boolean'].includes(typeof value)
    ? String(value).trim().slice(0, limit).trim() : '';
}

function extraValue(value) {
  // Do not serialize files, arbitrary objects, or nested hidden fields.
  return Array.isArray(value)
    ? value.slice(0, 50).map(item => text(item, 4000)).filter(Boolean).join(', ').slice(0, 4000).trim()
    : text(value, 4000);
}

/** Best-effort logging of a copy of validated data; never modifies its input. */
export async function saveSubmission(input = {}) {
  try {
    if (typeof window !== 'undefined' ||
        !(process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN)) return;
    if (!input || typeof input !== 'object') return;

    const client = await getWriteClient();
    if (!client.enabled) return;

    const label = text(input.formType || input.formLabel || input.formName ||
      input.formId || input.formSource, 100);
    const formType = Object.hasOwn(formLabels, label) ? formLabels[label] : FORMS[0].id;
    const excluded = new Set(privateFields);
    if (Array.isArray(input.honeypotFields)) {
      input.honeypotFields.forEach(field => excluded.add(keyName(text(field, 100))));
    }
    const extraFields = [];
    function addExtra(label, value) {
      if (extraFields.length >= 50) return;
      const fullLabel = text(label, 1000);
      const normalized = keyName(fullLabel);
      if (!fullLabel || excluded.has(normalized) || normalized.includes('honeypot')) return;
      const cleaned = extraValue(value);
      if (!cleaned) return;
      extraFields.push({
        _type: 'submissionExtraField',
        _key: `field-${extraFields.length}`,
        label: fullLabel.slice(0, 100),
        value: cleaned
      });
    }

    for (const [key, value] of Object.entries(input)) {
      if (!coreFields.has(key)) addExtra(key, value);
      if (extraFields.length >= 50) break;
    }
    if (Array.isArray(input.extraFields)) {
      for (const entry of input.extraFields) {
        if (entry && typeof entry === 'object') addExtra(entry.label, entry.value);
        if (extraFields.length >= 50) break;
      }
    }

    const now = new Date();
    await client.create({
      _type: 'formSubmission',
      formType,
      name: text(input.name, 200),
      email: text(input.email, 320),
      phone: text(input.phone, 100),
      message: text(input.message, 10000),
      sourcePage: text(input.sourcePage || input.sourcePath, 2048),
      extraFields,
      status: 'new',
      submittedAt: now.toISOString(),
      submittedDate: getSubmittedDate(now)
    });
  } catch {
    // Logging failures must never affect validation, email or the response.
    console.error('[forms] save failed');
  }
}
