import '../styles/main.scss'
import { Header, navConfig } from '@nypl/dgx-header-component';
import { Breadcrumbs, Hero, HeroTypes, Heading } from '@nypl/design-system-react-components';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header
        skipNav={{ target: 'main-content' }}
        navData={navConfig.current}
      />
      <div className="nypl-ds nypl--research ">
        <Breadcrumbs breadcrumbs={[{ url: "#", text: "Home" }]} />
        <Hero
          heroType={HeroTypes.Secondary}
          heading={
            <Heading
                level={1}
                id={"1"}
                text={"Research Catalog"}
                blockName={"hero"}
            />
          }
        />
        <main className="main-content">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  )
}

export default MyApp
