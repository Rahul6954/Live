import Layout from '../../components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CreateSite = () => {
  const { clientId } = useParams()
  const [site, setSite] = useState({
    label: '',
    url: '',
    password: '', // Added password
    notes: '',
  })

  const navigate = useNavigate()

  const handleInput = e => {
    const { name, value } = e.target
    setSite({
      ...site,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const payload = {
      siteUrl: site.label,
      label: site.label,
      url: site.url,
      password: site.password, // Added password to payload
      notes: site.notes,
      clientId: clientId,
    }

    try {
      const response = await fetch(`https://webvalut.onrender.com/api/vault-create/${clientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast.success('Site Created successfully!', {
          autoClose: 2000,
        })

        setSite({
          siteUrl: '',
          label: '',
          url: '',
          password: '', // Reset password field
          notes: '',
        })

        setTimeout(() => {
          navigate(`/client/all-items/${clientId}/site-data`)
        }, 1500)
      } else {
        toast.error('Creation failed. Please try again.', {
          autoClose: 3000,
        })
      }
    } catch (error) {
      console.log('Error:', error)
      toast.error('An error occurred. Please try again later.', {
        autoClose: 3000,
      })
    }
  }

  return (
    <>
      <Layout>
        <section className='section pt-0'>
          <div className='wrap'>
            <div className='row justify-center'>
              <div className='col-6'>
                <form className='signup' onSubmit={handleSubmit} autoComplete='off'>
                  <h1>Add Site</h1>

                  <div className='signup__field'>
                    <input
                      className='signup__input'
                      type='text'
                      name='label'
                      value={site.label}
                      onChange={handleInput}
                      required
                    />
                    <label className='signup__label' htmlFor='label'>
                      Enter Site Label
                    </label>
                  </div>

                  <div className='signup__field'>
                    <input
                      className='signup__input'
                      type='text'
                      name='url'
                      value={site.url}
                      onChange={handleInput}
                      required
                    />
                    <label className='signup__label' htmlFor='url'>
                      Enter Site URL
                    </label>
                  </div>

                  <div className='signup__field'>
                    <input
                      className='signup__input'
                      type='password'
                      name='password'
                      value={site.password} // Added password input field
                      onChange={handleInput}
                      required
                    />
                    <label className='signup__label' htmlFor='password'>
                      Enter Site Password
                    </label>
                  </div>

                  <div className='signup__field'>
                    <textarea
                      className='signup__input'
                      name='notes'
                      value={site.notes}
                      onChange={handleInput}
                    />
                    <label className='signup__label' htmlFor='notes'>
                      Enter Notes
                    </label>
                  </div>

                  <button type='submit'>Create</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <ToastContainer />
    </>
  )
}

export default CreateSite
