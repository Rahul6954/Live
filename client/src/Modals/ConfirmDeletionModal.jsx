import React from 'react'
import ReactModal from 'react-modal'
import { FaTimes } from 'react-icons/fa'
import { toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactModal.setAppElement('#root')

const ConfirmDeletionModal = ({ clientModal, modal, setClients, clients, setModal }) => {
  const token = localStorage.getItem('token')

  const modalSubmit = async () => {
    setModal(false)

    try {
      toast.warn('Permanently Deleted', {
        autoClose: 1500,
        transition: Flip,
      })

      const response = await fetch(`https://webvalut.onrender.com/api/record-delete/${clientModal._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status)
      }

      const result = await response.json()
      if (result.success) {
        setClients(clients.filter(item => item._id !== clientModal._id))
      } else {
        console.error('Failed to delete client:', result.msg || 'Unknown error')
        toast.error(result.msg || 'Failed to delete client')
      }
    } catch (error) {
      console.error('Error deleting client:', error)
      toast.error('Failed to delete client')
    }
  }

  return (
    <>
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
          overlay: { backgroundColor: 'rgba(184, 184, 184, 0.75)' },
        }}
      >
        <section className='modal__container'>
          <span onClick={() => setModal(false)} className='close'>
            <FaTimes />
          </span>
          <h3 className='modal__container--title'>Delete</h3>
          <p className='modal__container--subtitle'>
            This action will delete the record permanently.
          </p>
          <div className='modal__container--form-buttons'>
            <button onClick={modalSubmit} className='change__buttons'>
              Delete
            </button>
            <button onClick={() => setModal(false)} className='cancel__buttons'>
              Cancel
            </button>
          </div>
        </section>
      </ReactModal>
    </>
  )
}

export { ConfirmDeletionModal }
