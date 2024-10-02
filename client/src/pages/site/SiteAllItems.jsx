/* eslint-disable no-unused-vars */
import React from 'react'
import { SiteLinks, AllSite } from '../../components/SiteCompoonets'
import Layout from '../../components/Layout'

const SiteAllItems = () => {
  return (
    <Layout>
      <section className='section pt-0'>
        <div className='wrap'>
          <div className='row'>
            {/* <div
              className='col-3'
              style={{ position: 'sticky', top: 'calc(50% - 300px)', paddingTop: 0 }}
            >
              <SiteLinks />
            </div> */}
            <div className='col-12 ml-auto'>
              <AllSite />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SiteAllItems
