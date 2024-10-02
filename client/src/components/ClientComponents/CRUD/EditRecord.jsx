/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../style/vault/record.css'

ReactModal.setAppElement('#root')

const EditModal = ({ clientModal, setModal, modal, clients, setClients }) => {
  const [label, setLabel] = useState(clientModal.label)
  const [favorite, setFavorite] = useState(clientModal.favorite)

  const token = localStorage.getItem('token')

  const modalSubmit = async e => {
    e.preventDefault()
    setModal(false)

    // Update the local state
    setClients(
      clients.map(client =>
        client._id === clientModal._id
          ? {
              ...client,
              label,
              favorite,
            }
          : client,
      ),
    )

    // Send the updated data to the server using fetch
    try {
      const response = await fetch(`https://live-fgzh.onrender.com/api/record-edit/${clientModal._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          label,
          favorite,
        }),
      })

      if (response.ok) {
        toast.success('Record Edited Successfully', {
          autoClose: 1000,
          transition: Flip,
        })
      } else {
        throw new Error('Failed to edit the record')
      }
    } catch (error) {
      console.error('Error updating record:', error)
      toast.error('Failed to edit record', {
        autoClose: 1000,
        transition: Flip,
      })
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
          overlay: { backgroundColor: 'rgb(184 184 184 / 75%)' },
        }}
      >
        <section className='modal__container'>
          <span onClick={() => setModal(false)} className='close'>
            <FaTimes />
          </span>
          <h3 className='modal__container--title'>Edit Record</h3>
          <form onSubmit={modalSubmit} className='modal__container--form'>
            <label>Record Label:</label>
            <input type='text' value={label} onChange={e => setLabel(e.target.value)} />
            <div className='modal__container--form-buttons'>
              <button type='submit' className='change__buttons'>
                Save Changes
              </button>
              <button onClick={() => setModal(false)} className='cancel__buttons'>
                Cancel
              </button>
            </div>
          </form>
        </section>
      </ReactModal>
    </>
  )
}

export default EditModal
