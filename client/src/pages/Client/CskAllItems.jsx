/* eslint-disable no-unused-vars */
import React from 'react'
import { ClientLinks, AllClient } from '../../components/ClientComponents'
import Layout from '../../components/Layout'

const CskAllItems = () => {
  return (
    <Layout>
      <section className='section pt-0'>
        <div className='wrap'>
          <div className='row'>
            <div
              className='col-3'
              style={{ position: 'sticky', top: 'calc(50% - 300px)', paddingTop: 0 }}
            >
              <ClientLinks />
            </div>
            <div className='col-8 ml-auto'>
              <AllClient />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CskAllItems
