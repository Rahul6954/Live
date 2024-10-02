import { SiteLinks, Favorite } from '../../components/SiteCompoonets'
import Layout from '../../components/Layout'

const SiteFavroite = () => {
  return (
    <>
      <Layout>
        <section className='section  pt-0'>
          <div className='wrap'>
            <div className='row'>
              <div className='col-3'>
                <SiteLinks />
              </div>
              <div className='col-8 ml-auto'>
                <Favorite />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default SiteFavroite
