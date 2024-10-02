import React, { useRef, useState, useEffect, useCallback } from 'react'
import '../../../style/vault/record.css'
import { FaTrash } from 'react-icons/fa'
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import { Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MdEdit, MdOutlineRestorePage } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import createSvgForLetter from '../createSvgForLetter'

const Record = ({
  client,
  clients,
  setClients,
  setModal,
  setClientModal,
  star,
  setDelModal,
  setRestoreModal,
}) => {
  const [menu, setMenu] = useState(false)
  const [fav, setFav] = useState(client.favorite)
  const [error, setError] = useState(null)
  const menuRef = useRef()
  const menuIconsRef = useRef()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const config = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ favorite: !fav }),
  }

  const toggleStar = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/record-edit/${client._id}`, config)
      if (!response.ok) {
        throw new Error('Failed to update favorite status.')
      }
      setFav(prevFav => !prevFav)
    } catch (error) {
      console.error('Error updating favorite status:', error)
      setError('Failed to update favorite status.')
    }
  }

  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      setMenu(false)
    }
  }, [])

  const toggleMenu = () => {
    setMenu(prevMenu => !prevMenu)
  }

  const outFunction = useCallback(event => {
    if (!menuRef.current?.contains(event.target) && !menuIconsRef.current?.contains(event.target))
      setMenu(false)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escFunction)
    document.addEventListener('mousedown', outFunction)

    return () => {
      document.removeEventListener('keydown', escFunction)
      document.removeEventListener('mousedown', outFunction)
    }
  }, [escFunction, outFunction])

  const openClientData = () => {
    navigate(`/client/all-items/${client._id}/site-data`)
  }

  const handleDelete = async clientId => {
    try {
      toast.warn('Item Moved to trash!', {
        autoClose: 1500,
        transition: Slide,
      })
      const response = await fetch(`http://localhost:5000/api/record-delete/${clientId}`, {
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
        setClients(clients.filter(item => item._id !== clientId))
      } else {
        setError(result.msg || 'Failed to delete client.')
      }
    } catch (error) {
      console.error('Error deleting client:', error)
      setError('Failed to delete client.')
    }
  }

  const editClient = client => {
    if (!client) {
      console.error('Client data is not available')
      return
    }
    setModal(true)
    setClientModal(client)
    setMenu(false)
  }

  const restoreClient = client => {
    if (!client) {
      console.error('Client data is not available')
      return
    }
    setRestoreModal(true)
    setClientModal(client)
    setMenu(false)
  }

  const permenantDelete = client => {
    if (!client) {
      console.error('Client data is not available')
      return
    }
    setClientModal(client)
    setDelModal(true)
  }

  return (
    <>
      <div
        onClick={openClientData}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        {createSvgForLetter(client.label.charAt(0))}
        <h6>{client.label}</h6>
      </div>
      <div className='menu_toogle'>
        <span className='vault__contents--menu' ref={menuIconsRef}>
          {star && (
            <span onClick={toggleStar}>{fav === true ? <AiFillStar /> : <AiOutlineStar />}</span>
          )}
          {<IoEllipsisVerticalOutline onClick={toggleMenu} />}
        </span>
        <div className='menu__links'>
          <div className={`menu__dropdown-${menu}`}>
            {menu && (
              <div className='vault__contents--edit-icons' ref={menuRef}>
                {star && (
                  <>
                    <div>
                      <span onClick={() => handleDelete(client._id)} className='trash'>
                        <FaTrash />
                        Remove
                      </span>
                    </div>
                    <div>
                      <span onClick={() => editClient(client)} className='edit'>
                        <MdEdit />
                        Edit
                      </span>
                    </div>
                  </>
                )}
                {!star && (
                  <div>
                    <div>
                      <span onClick={() => restoreClient(client)} className='restore'>
                        <MdOutlineRestorePage />
                        Restore
                      </span>
                    </div>
                    <div>
                      <span onClick={() => permenantDelete(client)} className='restore'>
                        <FaTrash />
                        Delete
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Record
