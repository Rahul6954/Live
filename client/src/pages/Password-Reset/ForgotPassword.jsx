/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import pic from '../../assets/images/purple-mail.svg'
import axios from 'axios'

export const ForgotPassword = () => {
  const [emailId, setEmailId] = useState('')

  const [formSubmitted, setFormSubmitted] = useState(false)

  // handleSubmit
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await axios.post(`https://live-fgzh.onrender.com/api/password/reset-password-email`, {
        emailId,
      })
      setFormSubmitted(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {!formSubmitted && (
        <Layout>
          <section className='section section--registration'>
            <div className='wrap'>
              <div className='row justify-center'>
                <div className='col-6'>
                  <form className='signup' onSubmit={handleSubmit} autoComplete='off'>
                    <h1>Login</h1>

                    <div className='signup__field'>
                      <input
                        className='signup__input'
                        type='text'
                        name='emailId'
                        id='email'
                        required
                        autoComplete='off'
                        value={emailId}
                        onChange={e => setEmailId(e.target.value)}
                      />
                      <label className='signup__label' htmlFor='email'>
                        Email Id
                      </label>
                    </div>

                    <button>Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      )}
      {formSubmitted && (
        <section className='section'>
          <div className='wrap'>
            <div className='info__page'>
              <img src={pic} className='info__page--pic' alt='MailBox' />
              <p className='info__page--message'>
                Please close this tab and check your email:<u> {emailId} </u>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
