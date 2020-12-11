import { useRouter } from 'next/router'

import SearchBar from '../../components/SearchBar/SearchBar';
import ResultsList from '../../components/ResultsList/ResultsList';

export default function Search({ searchResults }) {
  return (
    <>
      <SearchBar />
      <ResultsList results={searchResults.itemListElement} />
    </>
  )
}

export async function getServerSideProps({ query }) {
  const res = await fetch(`http://qa-discovery.nypl.org/research/collections/shared-collection-catalog/api/search?q=${query.q}`)
  const response = await res.json()

  // Pass post data to the page via props
  return {
    props: { searchResults: response.searchResults },
  }
}
