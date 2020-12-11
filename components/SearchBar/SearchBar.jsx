import * as DS from '@nypl/design-system-react-components';

export default function Search() {
  return (
    <DS.SearchBar
      onSubmit={() => {}}
    >
      <DS.Input
        placeholder={"Enter keyword, title, journal title, or author"}
      />
      <DS.Button
        buttonType="primary"
      >
        <DS.Icon name="search" decorative={true} />
        Search
      </DS.Button>
    </DS.SearchBar>
  )
}
