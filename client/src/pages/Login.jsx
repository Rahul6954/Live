/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [user, setUser] = useState({
    uname: '',
    emailId: '',
    password: '',
  });

  const navigate = useNavigate();
  const { storeTokenInStorage } = useAuth();
  const [eye, setEye] = useState(true);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      identifier: user.uname || user.emailId, // Use either username or email
      password: user.password,
    };

    try {
      const response = await fetch(`https://webvalut.onrender.com/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const res_data = await response.json(); // Parse the response first

      if (response.ok) {
        toast.success('Login successful!', {
          autoClose: 2000,
        });

        setUser({
          uname: '',
          emailId: '',
          password: '',
        });

        localStorage.setItem('emailId', user.emailId);
        storeTokenInStorage(res_data.token);
        localStorage.setItem('token', res_data.token);
        localStorage.setItem('user_id', res_data.user._id);
        setTimeout(() => {
          navigate('/client/all-items');
        }, 1000);
      } else {
        if (res_data.message === 'Invalid username or email') {
          toast.info('User not found', {
            autoClose: 3000,
          });
        } else if (res_data.message === 'Incorrect password') {
          toast.warn('Incorrect password', {
            autoClose: 3000,
          });
        } else {
          toast.error('Login failed. Please try again.', {
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      console.log('Error:------', error);
      toast.error('An error occurred. Please try again later.', {
        autoClose: 3000,
      });
    }
  };

  const togglePassword = () => {
    const pswd = document.getElementById('pswd');
    if (eye === true && pswd.type === 'password') {
      setEye(false);
      pswd.type = 'text';
    } else {
      pswd.type = 'password';
      setEye(true);
    }
  };

  return (
    <Layout>
      <section className="section section--registration">
        <div className="wrap">
          <div className="row justify-center">
            <div className="col-6">
              <form className="signup" onSubmit={handleSubmit} autoComplete="off">
                <h1>Login</h1>

                <div className="signup__field">
                  <input
                    className="signup__input"
                    type="text"
                    name="emailId"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.uname || user.emailId}
                    onChange={handleInput}
                  />
                  <label className="signup__label" htmlFor="email">
                    User Name Or Email
                  </label>
                </div>

                <div className="signup__field" style={{ position: 'relative' }}>
                  <input
                    type={eye ? 'password' : 'text'}
                    required
                    id="pswd"
                    className="signup__input"
                    name="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                  <label className="signup__label" htmlFor="password">
                    Password
                  </label>
                  <span className="eye eye-toggle" onClick={() => togglePassword()}>
                    {eye ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <button type="submit">Sign in</button>

                <h2 className="mt-30">
                  Existing new user? <a href="/register">Sign up</a>
                </h2>
                <h2>
                  <a href="/forgot-password">Forgot Password?</a>
                </h2>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </Layout>
  );
};
