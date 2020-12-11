import Link from 'next/link';
import { isEmpty as _isEmpty } from 'underscore';
import { useRouter } from 'next/router'

// import {
//   trackDiscovery,
// } from '../../utils/utils';

const trackDiscovery = (event) => {};

import appConfig from '../../appConfig';

export default function ItemTableRow({
  bibId,
  item,
  searchKeywords,
  includeVolColumn,
  page,
}) {
  const router = useRouter()
  function getItemRecord(e) {
    e.preventDefault();

    console.log('router', router);

    let gaLabel = 'Item Holding';
    // const page = routes[routes.length - 1].component.name;
    // if (page === 'SearchResults') gaLabel = 'Search Results';
    // if (page === 'BibPage') gaLabel = 'Item Details';
    // if (page === 'SubjectHeadingShowPage') gaLabel = 'Subject Heading Details';

    trackDiscovery('Item Request', gaLabel);
    router.push(`${appConfig.baseUrl}/hold/request/${bibId}-${item.id}`);
  }

  function message() {
    return item.accessMessage.prefLabel || ' ';
  }

  function requestButton() {
    const { closedLocations } = appConfig;
    const status = item.status && item.status.prefLabel ? item.status.prefLabel : ' ';
    let itemRequestBtn = status;

    if (item.requestable) {
      itemRequestBtn = item.available ? (
        <Link
          href={`/hold/request/${bibId}-${item.id}`}
        >
          Request
        </Link>) :
        'In Use';
    }
    return itemRequestBtn;
  }

  if (_isEmpty(item)) {
    return null;
  }

  if (item.isElectronicResource) {
    return null;
  }

  let itemCallNumber = ' ';
  if (item.callNumber) {
    itemCallNumber = item.callNumber;
  }

  let itemLocation;

  if (item.location && item.locationUrl) {
    itemLocation = (
      <a href={item.locationUrl} className="itemLocationLink">{item.location}</a>
    );
  } else if (item.location) {
    itemLocation = item.location;
  } else {
    itemLocation = ' ';
  }

  return (
    <tr className={item.availability}>
      { includeVolColumn ? (
        <td className="vol-date-col" data-th="Vol/Date">
          <span>{item.volume || ''}</span>
        </td>
      ) : null}
      {page !== 'SearchResults' ? (
        <td data-th="Format">
          <span>{item.format || ' '}</span>
        </td>
      ) : null}
      <td data-th="Message"><span>{message()}</span></td>
      <td data-th="Status"><span>{requestButton()}</span></td>
      <td data-th="Call Number"><span>{itemCallNumber}</span></td>
      <td data-th="Location"><span>{itemLocation}</span></td>
    </tr>
  );
}
