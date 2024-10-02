import React, { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import Record from './CRUD/Record' // Import the refactored Record component
import { useNavigate } from 'react-router-dom'
import { ConfirmDeletionModal } from '../../Modals/ConfirmDeletionModal'
import { ConfirmRestoreModal } from '../../Modals/ConfirmRestoreModal'

const Trash = () => {
  const [clients, setClients] = useState([])
  const [delModal, setDelModal] = useState(false)
  const [restoreModal, setRestoreModal] = useState(false)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(false) // State for controlling the modal
  const [clientModal, setClientModal] = useState(null) // State for the client to be edited
  const [siteModal, setSiteModal] = useState(null) // Define siteModal to prevent the reference error
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

      // Assuming each client has a 'deleted' field
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
                    client={client}
                    clients={clients}
                    setClients={setClients}
                    setModal={setDelModal}
                    key={client._id}
                    setClientModal={setClientModal} // Pass setClientModal here
                    star={false}
                    setDelModal={setDelModal}
                    setRestoreModal={setRestoreModal}
                  />
                </div>
              </div>
            ))
        ) : (
          <p>The Items here are automatically deleted after 7 days</p>
        )}
      </div>

      {delModal && (
        <ConfirmDeletionModal
          clientModal={clientModal} // Pass clientModal to the modal
          modal={delModal}
          clients={clients}
          setModal={setDelModal}
          setClients={setClients}
          close={() => setDelModal(false)}
        />
      )}

      {restoreModal && (
        <ConfirmRestoreModal
          clientModal={clientModal} // Correctly pass clientModal
          modal={restoreModal}
          clients={clients}
          setModal={setRestoreModal}
          setClients={setClients} // Ensure you're updating clients after restoration
          close={() => setRestoreModal(false)}
        />
      )}
    </div>
  )
}

export default Trash
