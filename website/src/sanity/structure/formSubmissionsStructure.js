import {FORMS} from '../../lib/forms/config.js';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/** A single top-level item; each known form is visible even without submissions. */
export function formSubmissionsStructure(S, context) {
  const client = context.getClient({apiVersion: '2024-01-01'});
  return S.listItem().id('form-submissions').title('Form Submissions').child(
    S.list().id('form-submissions').title('Form Submissions').items(
      FORMS.map(form => S.listItem().id(`form-${form.id}`).title(form.title).child(async () => {
        const records = await client.fetch(
          '*[_type == "formSubmission" && formType == $formType && defined(submittedDate)]{submittedDate}',
          {formType: form.id}
        );
        const years = new Map();
        for (const record of records) {
          const match = /^(\d{4})-(0[1-9]|1[0-2])-\d{2}$/.exec(record.submittedDate || '');
          if (!match) continue;
          const [, year, month] = match;
          if (!years.has(year)) years.set(year, new Map());
          const months = years.get(year);
          months.set(month, (months.get(month) || 0) + 1);
        }

        return S.list().id(`years-${form.id}`).title(form.title).items(
          [...years.keys()].sort((a, b) => Number(b) - Number(a)).map(year => {
            const months = years.get(year);
            const count = [...months.values()].reduce((total, value) => total + value, 0);
            return S.listItem().id(`${form.id}-${year}`).title(`${year} (${count})`).child(
              S.list().id(`months-${form.id}-${year}`).title(`${form.title} · ${year}`).items(
                [...months.keys()].sort((a, b) => Number(b) - Number(a)).map(month =>
                  S.listItem().id(`${form.id}-${year}-${month}`)
                    .title(`${monthNames[Number(month) - 1]} (${months.get(month)})`)
                    .child(
                      S.documentList().id(`entries-${form.id}-${year}-${month}`)
                        .title(`${monthNames[Number(month) - 1]} ${year}`)
                        .schemaType('formSubmission')
                        .filter('_type == "formSubmission" && formType == $formType && submittedDate match $prefix')
                        .params({formType: form.id, prefix: `${year}-${month}*`})
                        .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                    )
                )
              )
            );
          })
        );
      }))
    )
  );
}

export default formSubmissionsStructure;
