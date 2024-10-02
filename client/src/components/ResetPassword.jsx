/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './resetPassword.css'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    try {
      const response = await axios.post(`/api/password/reset/${token}`, { password })
      setMessage(response.data.message)
      if (response.data.success) {
        navigate('/login')
      }
    } catch (error) {
      setMessage('Error resetting password. Please try again.')
    }
  }

  return (
    <div className='reset-password-container'>
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type='password'
          placeholder='Enter new password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Confirm new password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button type='submit'>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ResetPassword
