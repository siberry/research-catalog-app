import '../styles/main.scss'
import { Header, navConfig } from '@nypl/dgx-header-component';
import { Breadcrumbs, Hero, HeroTypes, Heading } from '@nypl/design-system-react-components';

import { requireUser, getPatronData } from '../utils/auth';

function MyApp({ Component, pageProps, patron }) {
  return (
    <div>
      <Header
        skipNav={{ target: 'main-content' }}
        navData={navConfig.current}
        patron={patron}
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

export async function getServerSideProps({ req, res }) {
  // const patron = await getPatronData(req, res);

  // Pass patron data to the page via props
  return {
    props: {
      // patron,
    },
  }
}

export default MyApp
