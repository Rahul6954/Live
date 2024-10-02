import React, { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../style/vault/record.css'

ReactModal.setAppElement('#root')

const EditSiteModal = ({ siteModal, setModal, modal, sites, setSites }) => {
  const [label, setLabel] = useState(siteModal.label)
  const [favorite, setFavorite] = useState(siteModal.favorite)
  const [siteUrl, setSiteUrl] = useState(siteModal.siteUrl)
  const [password, setPassword] = useState(siteModal.password) // Initialize with the existing decrypted password
  const [notes, setNotes] = useState(siteModal.notes)
  const [showPassword, setShowPassword] = useState(false) // Start with password hidden

  const togglePassword = () => {
    setShowPassword(!showPassword) // Toggle password visibility
  }

  const modalSubmit = async e => {
    e.preventDefault()
    setModal(false)

    // Update local state
    setSites(
      sites.map(site =>
        site._id === siteModal._id
          ? {
              ...site,
              label,
              favorite,
              siteUrl,
              password, // Send the new password back
              notes,
            }
          : site,
      ),
    )

    // Send the updated data to the server
    try {
      const response = await fetch(
        `http://localhost:5000/api/vault-data/record-edit/${siteModal._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            label,
            favorite,
            siteUrl,
            password,
            notes,
          }),
        },
      )

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
        },
        overlay: { backgroundColor: 'rgb(184 184 184 / 75%)' },
      }}
    >
      <section className='modal__container'>
        <span onClick={() => setModal(false)} className='close'>
          <FaTimes />
        </span>
        <h3 className='modal__container--title'>Edit</h3>
        <form onSubmit={modalSubmit} className='modal__container--form'>
          <label>Site Name:</label>
          <input type='text' value={label} onChange={e => setLabel(e.target.value)} />
          <label>Site Link:</label>
          <input type='text' value={siteUrl} onChange={e => setSiteUrl(e.target.value)} />
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows='3'
            placeholder='Enter notes'
          />
          <label>New Password:</label>
          <div className='pass'>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type based on state
              id='pswd'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span className='eye' onClick={togglePassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Toggle icon */}
            </span>
          </div>
          <div className='modal__container--form-buttons'>
            <button type='submit' className='change__buttons'>
              Change
            </button>
            <button onClick={() => setModal(false)} className='cancel__buttons'>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </ReactModal>
  )
}

export default EditSiteModal
