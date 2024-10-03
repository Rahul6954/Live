/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import Record from './CRUD/Record' // Import the refactored Record component
import { useNavigate } from 'react-router-dom'
import EditModal from './CRUD/EditRecord' // Import EditModal if you're using it here

const AllClient = () => {
  const [clients, setClients] = useState([])
  const [error, setError] = useState('')
  const [modal, setModal] = useState(false) // State for controlling the modal
  const [clientModal, setClientModal] = useState(null) // State for the client to be edited
  const [searchTerm, setSearchTerm] = useState('') // State for search input
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  console.log('Token from localStorage:', token)

  const fetchData = async () => {
    try {
      const response = await fetch('https://webvalut.onrender.com/api/client-data', {
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
      const clientArr = data.clients.filter(client => !client.deleted)
      setClients(clientArr)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to fetch clients.')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Filter clients based on the search term
  const filteredClients = clients.filter(client =>
    (client.label?.toLowerCase() || '').includes(searchTerm.toLowerCase()),
  )
  return (
    <div className='ui-section'>
      <div className='ui-section__header'>
        <h2>All Items</h2>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search Clients...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <span className='plus' onClick={() => navigate('/client-create')}>
          <FaPlus />
        </span>
      </div>
      {error && <p>{error}</p>}
      <div className='row'>
        {filteredClients.length > 0 ? (
          filteredClients
            .slice()
            .reverse()
            .map(client => (
              <div key={client._id} className='col-12 mb-30'>
                <div className='card'>
                  <Record
                    key={client._id}
                    client={client}
                    star={true}
                    clients={clients}
                    setClients={setClients}
                    setModal={setModal}
                    setClientModal={setClientModal}
                    dataCount={client.dataCount} // Pass the data count here
                  />
                </div>
              </div>
            ))
        ) : (
          <>
            {!error && <p>No clients found.</p>}
            <span className='plus' onClick={() => navigate('/client-create')}>
              <FaPlus />
            </span>
          </>
        )}
      </div>

      {/* Render the EditModal if modal is open */}
      {modal && (
        <EditModal
          clientModal={clientModal}
          setModal={setModal}
          modal={modal}
          clients={clients}
          setClients={setClients}
        />
      )}
    </div>
  )
}

export default AllClient
