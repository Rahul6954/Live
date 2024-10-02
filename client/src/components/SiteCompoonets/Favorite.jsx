// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'

import createSvgForLetter from './createSvgForLetter'
import { useParams } from 'react-router-dom'

const Favorite = () => {
  const { clientId } = useParams()
  console.log(clientId)

  const [clients, setClients] = useState([])
  const [error, setError] = useState('')

  // Fetch clients from the backend
  const fetchData = async () => {
    const clientArr = []
    try {
      const response = await fetch(`http://localhost:5000/api/vault-data/${clientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Fetched data:', data) // Log the entire data object

      // Assuming each client has a 'favorite' field
      for (let i = 0; i < data.clients.length; i++) {
        if (data.clients[i].favorite === true) {
          clientArr.push(data.clients[i])
        }
      }

      setClients(clientArr)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to fetch clients.')
      setClients([]) // Clear clients in case of an error
    }
  }

  // Delete client by ID

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='ui-section'>
      <div className='ui-section__header'>
        <h2>Favorite</h2>
      </div>
      {error && <p>{error}</p>}

      <div className='row'>
        {clients.length > 0 ? (
          clients.map(client => (
            <div key={client._id} className='col-12 mb-30'>
              <div className='card'>
                {createSvgForLetter(client.label.charAt(0))}
                <h6>{client.label}</h6> {/* Render the rest of the label */}
              </div>
            </div>
          ))
        ) : (
          <p> Add records by marking them with ⭐</p>
        )}
      </div>
    </div>
  )
}

export default Favorite
