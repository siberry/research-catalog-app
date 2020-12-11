import * as DS from '@nypl/design-system-react-components';

export default function ResultsList({ results }) {
  return(
    <div>
      { results ?
        results.map(result => <DS.Card />) :
        null
      }
    </div>
  )
}
