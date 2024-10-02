import React from 'react'
import ReactModal from 'react-modal'
import { FaTimes } from 'react-icons/fa'
import { toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactModal.setAppElement('#root')

const ConfirmRestoreModal = ({ clientModal, modal, setClients, clients, setModal }) => {
  const token = localStorage.getItem('token')

  const modalSubmit = async () => {
    if (!clientModal || !clientModal._id) {
      toast.error('Client data is not available.')
      return
    }

    setModal(false)

    try {
      console.log('Restoring Client:', clientModal._id)

      // Restore the client by setting 'deleted' to false
      const response = await fetch(`http://localhost:5000/api/record-edit/${clientModal._id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleted: false }), // Set 'deleted' to false to restore
      })

      if (!response.ok) {
        throw new Error('Failed to restore client.')
      }

      const updatedClient = await response.json()
      console.log('Client Restored Successfully:', updatedClient)

      // Filter out the restored client from the deleted list immediately
      setClients(prevClients => prevClients.filter(client => client._id !== updatedClient._id))

      toast.success('Restored Successfully', {
        autoClose: 1500,
        transition: Flip,
      })
    } catch (error) {
      console.error('Error restoring client:', error.message || error)
      toast.error('Failed to restore client')
    }
  }

  return (
    <ReactModal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      shouldCloseOnOverlayClick={true}
      style={{
        content: {
          position: 'static',
          inset: '0px',
          border: 'none',
          background: 'none',
          visibility: 'none',
        },
        overlay: { backgroundColor: 'rgb(184 184 184 / 75%)' },
      }}
    >
      <section className='modal__container'>
        <span onClick={() => setModal(false)} className='close'>
          <FaTimes />
        </span>
        <h3 className='modal__container--title'>Restore</h3>
        <p className='modal__container--subtitle'>This step restores the record</p>
        <div className='modal__container--form-buttons'>
          <button onClick={modalSubmit} className='change__buttons'>
            Restore
          </button>
          <button onClick={() => setModal(false)} className='cancel__buttons'>
            Cancel
          </button>
        </div>
      </section>
    </ReactModal>
  )
}

export { ConfirmRestoreModal }
