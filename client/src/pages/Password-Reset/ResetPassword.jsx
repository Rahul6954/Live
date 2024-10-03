// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const ResetPassword = () => {
  const [pass, setPass] = useState('')
  const [cpass, setCpass] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [linkValid, setLinkValid] = useState(true)
  const { token, emailId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const isValidLink = async () => {
      try {
        const { data } = await axios.get(
          `https://webvalut.onrender.com/api/password/reset-password-check-link/${token}`,
        )
        setLinkValid(data.success)
      } catch (error) {
        console.error('Error:', error)
        setLinkValid(false)
      }
    }
    isValidLink()
  }, [token])

  const handleSubmit = async e => {
    e.preventDefault()

    if (pass.length < 6) {
      alert('Password must be at least 6 characters long.')
    } else if (pass !== cpass) {
      alert("Passwords don't match.")
    } else {
      try {
        const { data } = await axios.post(
          `https://webvalut.onrender.com/api/password/reset-password/${emailId}/${token}`,
          {
            password: pass,
            confirmPassword: cpass,
            token,
            emailId,
          },
        )
        console.log(data)

        if (data.success) {
          alert('Password successfully changed.')
          setFormSubmitted(true)
        } else if (data.success === false && data.msg === 'Token not verified') {
          setLinkValid(false)
        }
      } catch (error) {
        console.error('Error:', error)
        alert('An error occurred while resetting your password.')
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <Layout>
      {!formSubmitted && linkValid && (
        <section className='section section--registration'>
          <div className='wrap'>
            <div className='row justify-center'>
              <div className='col-6'>
                <form className='signup' onSubmit={handleSubmit} autoComplete='off'>
                  <h1>Reset Password</h1>

                  <div className='signup__field'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      id='password'
                      className='signup__input'
                      name='password'
                      autoComplete='off'
                      value={pass}
                      onChange={e => setPass(e.target.value)}
                    />
                    <label className='signup__label' htmlFor='password'>
                      New Password
                    </label>
                    <span className='eye eye-toggle' onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <div className='signup__field'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      id='confirmPassword'
                      className='signup__input'
                      name='confirmPassword'
                      autoComplete='off'
                      value={cpass}
                      onChange={e => setCpass(e.target.value)}
                    />
                    <label className='signup__label' htmlFor='confirmPassword'>
                      Confirm Password
                    </label>
                    <span className='eye eye-toggle' onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <button type='submit'>Reset Password</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
      {formSubmitted && linkValid && (
        <div className='info__page'>
          <p className='info__page--message h5'>Your password has been updated</p>
          <button onClick={() => navigate('/login')} className='info__page--proceed-button'>
            Login
          </button>
        </div>
      )}
      {!linkValid && (
        <div className='info__page'>
          <p className='info__page--message h5'>This link is not valid</p>
          <button onClick={() => navigate('/login')} className='info__page--proceed-button'>
            Login
          </button>
        </div>
      )}
    </Layout>
  )
}
