/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const AllsiteData = () => {
  const [site, setSites] = useState([]) // State to store fetched site data
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  console.log('Token from localStorage:', token)

  const fetchData = async () => {
    try {
      const response = await fetch('https://live-fgzh.onrender.com/api/vault-data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const siteArr = data.site.filter(site => !site.deleted) // Adjust if needed
      setSites(siteArr)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to fetch site.')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='ui-section'>
      <div className='ui-section__header'>
        <h2>All Items</h2>
        <span className='plus' onClick={() => navigate('/vault-create')}>
          <FaPlus />
        </span>
      </div>
      {error && <p>{error}</p>}
      <div className='row'>
        {site.length > 0 ? (
          site.map(site => (
            <>
              <div key={site._id} className='site-card'>
                <center>
                  <p>{site.label}</p>
                  <br />
                  <p>
                    <strong>Site URL:</strong> {site.siteUrl}
                  </p>
                  <p>
                    <strong>Notes:</strong> {site.notes}
                  </p>
                </center>
              </div>
            </>
          ))
        ) : (
          <p>No site found.</p>
        )}
      </div>
    </div>
  )
}

export default AllsiteData
