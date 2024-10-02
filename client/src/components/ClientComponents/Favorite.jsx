// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import Record from './CRUD/Record' // Import the refactored Record component
import { useNavigate } from 'react-router-dom'
import EditModal from './CRUD/EditRecord' // Import EditModal if you're using it here

const Favorite = () => {
  const [clients, setClients] = useState([])
  const [error, setError] = useState('')
  const [modal, setModal] = useState(false) // State for controlling the modal
  const [clientModal, setClientModal] = useState(null) // State for the client to be edited
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  console.log('Token from localStorage:', token)

  const fetchData = async () => {
    const clientArr = []

    try {
      const response = await fetch('http://localhost:5000/api/client-data', {
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
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='ui-section'>
      <div className='ui-section__header'>
        <h2>All Items</h2>
        <span className='plus' onClick={() => navigate('/client-create')}>
          <FaPlus />
        </span>
      </div>
      {error && <p>{error}</p>}
      <div className='row'>
        {clients.length > 0 ? (
          clients
            .slice()
            .reverse()
            .map(client => (
              <div key={client._id} className='col-12 mb-30'>
                <div className='card'>
                  <Record
                    key={client._id}
                    client={client}
                    star={true} // Set based on your condition
                    clients={clients}
                    setClients={setClients}
                    setModal={setModal} // Pass setModal here
                    setClientModal={setClientModal} // Pass setClientModal here
                  />
                </div>
              </div>
            ))
        ) : (
          <p> Add records by marking them with ⭐</p>
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

export default Favorite
