// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'

import { FaTrash } from 'react-icons/fa' // Import the trash icon
import createSvgForLetter from './createSvgForLetter'

const Trash = () => {
  const [clients, setClients] = useState([])
  const [error, setError] = useState('')

  const token = localStorage.getItem('token') // Assuming the token is stored in localStorage

  // Fetch clients from the backend
  const fetchData = async () => {
    const clientArr = []
    try {
      const response = await fetch('https://live-fgzh.onrender.com/api/client-data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json() // Parse JSON response
      console.log(data)

      for (let i = 0; i < data.clients.length; i++) {
        if (data.clients[i].deleted === true) {
          // Fetch only deleted clients
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
  const handleDelete = async clientId => {
    try {
      const response = await fetch(`https://live-fgzh.onrender.com/api/record-delete/${clientId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()
      if (response.ok && result.success) {
        // Remove the deleted client from the state
        setClients(clients.filter(client => client._id !== clientId))
      } else {
        setError(result.msg || 'Failed to delete client.')
      }
    } catch (error) {
      console.error('Error deleting client:', error)
      setError('Failed to delete client.')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='ui-section'>
      <div className='ui-section__header'>
        <h2>Trash</h2>
      </div>
      {error && <p>{error}</p>}

      <div className='row'>
        {clients.length > 0 ? (
          clients.map(client => (
            <div key={client._id} className='col-12 mb-30'>
              <div className='card'>
                {createSvgForLetter(client.label.charAt(0))}
                <h6>{client.label}</h6> {/* Render the rest of the label */}
                <span className='delete-icon' onClick={() => handleDelete(client._id)}>
                  <FaTrash />
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>The Items here are automatically deleted after 7 days</p>
        )}
      </div>
    </div>
  )
}

export default Trash
