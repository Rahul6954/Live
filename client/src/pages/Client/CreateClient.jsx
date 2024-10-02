import Layout from '../../components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react' // Don't forget to import useState
import { useNavigate } from 'react-router-dom' // Assuming you're using react-router

const CreateClient = () => {
  const [user, setUser] = useState({
    label: '',
  })

  const token = localStorage.getItem('token')
  const navigate = useNavigate() // Use navigate to redirect

  const handleInput = e => {
    const { name, value } = e.target // Destructure name and value from event

    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const payload = {
      label: user.label, // Fixed payload assignment
    }

    try {
      const response = await fetch(`https://live-fgzh.onrender.com/api/client-create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      // const res_data = await response.json();

      if (response.ok) {
        toast.success('Client Created successful!', {
          autoClose: 2000,
        })

        setUser({
          client: '', // Reset client field
        })

        setTimeout(() => {
          navigate('/client/all-items') // Redirect after login
        }, 1500)
      } else {
        // Handle specific error messages

        toast.error('Login failed. Please try again.', {
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
                  <h1>Add Client</h1>

                  <div className='signup__field'>
                    <input
                      className='signup__input'
                      type='text'
                      name='label'
                      value={user.label || ''} // Ensure it's always a string
                      onChange={handleInput}
                      required
                    />

                    <label className='signup__label' htmlFor='email'>
                      Enter Client
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

export default CreateClient
