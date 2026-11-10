import {FORMS} from '../../lib/forms/config.js';
import {SITE_TIMEZONE} from '../../lib/forms/date.js';

export const formSubmission = {
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  initialValue: {status: 'new'},
  orderings: [{
    title: 'Newest first',
    name: 'newestFirst',
    by: [{field: 'submittedAt', direction: 'desc'}]
  }],
  fields: [
    {
      name: 'formType', title: 'Form', type: 'string', readOnly: true,
      options: {list: FORMS.map(form => ({title: form.title, value: form.id}))}
    },
    {name: 'name', title: 'Name', type: 'string', readOnly: true},
    {name: 'email', title: 'Email', type: 'string', readOnly: true},
    {name: 'phone', title: 'Phone', type: 'string', readOnly: true},
    {name: 'message', title: 'Message', type: 'text', readOnly: true},
    {name: 'sourcePage', title: 'Source page', type: 'string', readOnly: true},
    {
      name: 'extraFields', title: 'Extra fields', type: 'array', readOnly: true,
      of: [{
        type: 'object', name: 'submissionExtraField', readOnly: true,
        fields: [
          {name: 'label', title: 'Label', type: 'string', readOnly: true},
          {name: 'value', title: 'Value', type: 'text', readOnly: true}
        ],
        preview: {select: {title: 'label', subtitle: 'value'}}
      }]
    },
    {
      name: 'status', title: 'Status', type: 'string', initialValue: 'new',
      options: {list: [
        {title: 'New', value: 'new'},
        {title: 'Contacted', value: 'contacted'},
        {title: 'Closed', value: 'closed'}
      ]}
    },
    {name: 'submittedAt', title: 'Submitted at', type: 'datetime', readOnly: true},
    {name: 'submittedDate', title: 'Submitted date', type: 'string', readOnly: true}
  ],
  preview: {
    select: {name: 'name', email: 'email', status: 'status', submittedAt: 'submittedAt'},
    prepare({name, email, status, submittedAt}) {
      const date = new Date(submittedAt);
      const displayDate = Number.isNaN(date.getTime()) ? 'Unknown date' : date.toLocaleString('en-NZ', {
        timeZone: SITE_TIMEZONE,
        dateStyle: 'medium',
        timeStyle: 'short'
      });
      return {
        title: name || 'Unnamed submission',
        subtitle: `${displayDate} | ${email || ''} | ${status || 'new'}`
      };
    }
  }
};

export default formSubmission;
