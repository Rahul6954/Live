import React, { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import Record from './CRUD/Record' // Import the refactored Record component
import { useNavigate, useParams } from 'react-router-dom'
import EditModal from './CRUD/EditRecord' // Import EditModal if used for editing

const AllSite = () => {
  const [sites, setSites] = useState([]) // State for site data
  const [error, setError] = useState('') // State for error messages
  const [modal, setModal] = useState(false) // State for controlling the modal
  const [siteModal, setSiteModal] = useState(null) // State for the site to be edited
  const navigate = useNavigate()
  const { clientId } = useParams() // Get clientId from the URL params

  // Fetch site data based on the clientId
  const fetchClientData = async () => {
    try {
      const response = await fetch(`https://live-fgzh.onrender.com/api/vault-data/${clientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.success) {
        setSites(data.sites) // Set the fetched site data
      } else {
        setError('Failed to fetch site data.')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    }
  }

  // Fetch client data when the component mounts and when clientId changes
  useEffect(() => {
    if (clientId) {
      fetchClientData()
    }
  }, [clientId])

  return (
    <div className='ui-section'>
      <div className='ui-section__header'>
        <h2>Client Sites</h2>
        <span
          className='plus'
          onClick={() => navigate(`/client/all-items/${clientId}/site-data/create-site`)}
        >
          <FaPlus />
        </span>
        <button onClick={() => navigate('/client/all-items')}>Back to Clients</button>
      </div>
      {error && <p>{error}</p>} {/* Display error if there's an issue fetching data */}
      <div className='row'>
        {sites.length > 0 ? (
          // Render the list of sites using the Record component
          sites
            .slice()
            .reverse() // Optional: reverse to show most recent first
            .map(site => (
              <div key={site._id} className='col-12 mb-30'>
                <div className='card'>
                  <Record
                    site={site} // Pass the site object to the Record component
                    sites={sites} // Pass the full list of sites
                    setSites={setSites} // Set sites with updated data
                    setModal={setModal} // Open modal for editing
                    setSiteModal={setSiteModal} // Set the site to be edited
                    star={true} // Enable favorite/star functionality
                  />
                </div>
              </div>
            ))
        ) : (
          <>
            {!error && <p>Add Site</p>} {/* Show "Add Site" if there are no sites */}
            <span
              className='plus'
              onClick={() => navigate(`/client/all-items/${clientId}/site-data/create-site`)}
            >
              <FaPlus />
            </span>
          </>
        )}
      </div>
      {/* Render EditModal if the modal is open */}
      {modal && (
        <EditModal
          siteModal={siteModal} // Pass the site to be edited
          setModal={setModal} // Control modal visibility
          modal={modal} // Pass the modal state
          sites={sites} // List of sites
          setSites={setSites} // Update sites after editing
        />
      )}
    </div>
  )
}

export default AllSite
