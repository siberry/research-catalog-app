import { isArray as _isArray } from 'underscore';

import ItemTableRow from './ItemTableRow';

export default function ItemTable({ items, bibId, id, searchKeywords, page }) {
  if (
    !_isArray(items) ||
    !items.length ||
    items.every(item => item.isElectronicResource)
  ) {
    return null;
  }

  const includeVolColumn = (
    items.some(item => item.volume && item.volume.length) && page !== 'SearchResults'
  );

  return (
    <table className="nypl-basic-table" id={id}>
      <caption className="hidden">Item details</caption>
      <thead>
        <tr>
          {includeVolColumn ? <th scope="col">Vol/Date</th> : null}
          {page !== 'SearchResults' ? <th scope="col">Format</th> : null}
          <th scope="col">Access</th>
          <th scope="col">Status</th>
          <th scope="col">Call Number</th>
          <th scope="col">Location</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map(item =>
            (<ItemTableRow
              key={item.id}
              item={item}
              bibId={bibId}
              searchKeywords={searchKeywords}
              includeVolColumn={includeVolColumn}
              page={page}
            />),
          )
        }
      </tbody>
    </table>
  );
};
