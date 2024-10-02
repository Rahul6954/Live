import { SiteLinks, Trash } from '../../components/SiteCompoonets'
import Layout from '../../components/Layout'

const SiteTrash = () => {
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
                <Trash />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default SiteTrash
