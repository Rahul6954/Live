import React, { useRef, useState, useEffect, useCallback } from 'react'
import '../../../style/vault/record.css'
import { FaTrash } from 'react-icons/fa'
import { IoEllipsisVerticalOutline, IoClipboardOutline } from 'react-icons/io5'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { ToastContainer, toast, Slide, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MdEdit, MdOutlineRestorePage } from 'react-icons/md'
import createSvgForLetter from '../createSvgForLetter'

const Record = ({
  site,
  sites,
  setSites,
  setModal,
  setSiteModal,
  star,
  setDelModal,
  setRestoreModal,
}) => {
  const [menu, setMenu] = useState(false)
  const [fav, setFav] = useState(site.favorite)
  const [error, setError] = useState(null)
  const menuRef = useRef()
  const menuIconsRef = useRef()

  const toggleStar = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/vault-data/record-edit/${site._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite: !fav }),
      })
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

  const handleDelete = async siteId => {
    try {
      toast.warn('Site moved to trash!', {
        autoClose: 1500,
        transition: Slide,
      })
      const response = await fetch(`http://localhost:5000/api/vault-data/record-delete/${siteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status)
      }

      const result = await response.json()
      if (result.success) {
        setSites(sites.filter(item => item._id !== siteId))
      } else {
        setError(result.msg || 'Failed to delete site.')
      }
    } catch (error) {
      console.error('Error deleting site:', error)
      setError('Failed to delete site.')
    }
  }

  const decryptPassword = async siteObj => {
    try {
      const response = await fetch('http://localhost:5000/api/vault-decrypt-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ siteObj: { password: siteObj.password } }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const decryptedPassword = data.decryptedPassword // Get decrypted password
      siteObj.password = decryptedPassword

      setSites(prevSites =>
        prevSites.map(prevSite => {
          return prevSite._id === siteObj._id
            ? {
                ...prevSite,
                password: decryptedPassword,
              }
            : prevSite
        }),
      )
    } catch (error) {
      console.error('Error decrypting password:', error)
    }
  }

  const copyField = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe)
      toast.success('Saved to Clipboard', {
        autoClose: 1000,
        transition: Bounce,
        position: 'bottom-center',
        hideProgressBar: true,
      })
      setMenu(false)
    } catch (err) {
      toast.error('Failed to copy!')
    }
  }

  const editSite = async site => {
    await decryptPassword(site) // Ensure the password is decrypted
    setModal(true)
    setSiteModal(site)
    setMenu(false)
  }

  const restoreSite = site => {
    setRestoreModal(true)
    setSiteModal(site)
    setMenu(false)
  }

  const permenantDelete = site => {
    setDelModal(true)
    setSiteModal(site)
  }

  return (
    <>
      <div
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onClick={() => editSite(site)}
      >
        {createSvgForLetter(site.label.charAt(0))}
        <h6>{site.label}</h6>
      </div>
      <div className='menu_toogle'>
        <span className='vault__contents--menu' ref={menuIconsRef}>
          {star && (
            <span onClick={toggleStar}>{fav === true ? <AiFillStar /> : <AiOutlineStar />}</span>
          )}
          <IoEllipsisVerticalOutline onClick={toggleMenu} />
        </span>
        <div className='menu__links'>
          <div className={`menu__dropdown-${menu}`}>
            {menu && (
              <div className='vault__contents--edit-icons' ref={menuRef}>
                {star && (
                  <>
                    <div>
                      <span onClick={() => handleDelete(site._id)} className='trash'>
                        <FaTrash />
                        Remove
                      </span>
                    </div>
                    <div>
                      <span onClick={() => editSite(site)} className='edit'>
                        <MdEdit />
                        Edit
                      </span>
                    </div>
                    <div>
                      <span onClick={() => copyField(site.siteUrl)}>
                        <IoClipboardOutline />
                        Site Url
                      </span>
                    </div>
                    <div>
                      <span onClick={() => copyField(site.password)}>
                        <IoClipboardOutline />
                        Password
                      </span>
                    </div>
                    <div>
                      <span onClick={() => copyField(site.notes)}>
                        <IoClipboardOutline />
                        Notes
                      </span>
                    </div>
                  </>
                )}

                {!star && (
                  <div>
                    <div>
                      <span onClick={() => restoreSite(site)} className='restore'>
                        <MdOutlineRestorePage />
                        Restore
                      </span>
                    </div>
                    <div>
                      <span onClick={() => permenantDelete(site)} className='restore'>
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
