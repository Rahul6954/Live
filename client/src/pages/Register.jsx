// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [user, setUser] = useState({
    uname: '',
    emailId: '',
    password: '',
    againPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    if (user.password !== user.againPassword) {
      console.log("Password Don't Match!");
    } else {
      try {
        const response = await fetch('https://live-fgzh.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          setUser({
            uname: '',
            emailId: '',
            password: '',
            againPassword: '',
          });
          navigate('/login');
        } else {
          const errorData = await response.json();
          console.log('Error response:', errorData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Layout>
      <section className="section section--registration">
        <div className="wrap">
          <div className="row justify-center">
            <div className="col-6">
              <form className="signup" onSubmit={handleSubmit} autoComplete="off">
                <h1>Create account</h1>

                <div className="signup__field">
                  <input
                    className="signup__input"
                    type="emailId"
                    name="emailId"
                    id="emailId"
                    required
                    autoComplete="off"
                    value={user.emailId}
                    onChange={handleInput}
                  />
                  <label className="signup__label" htmlFor="emailId">
                    EmailId
                  </label>
                </div>
                <div className="signup__field">
                  <input
                    className="signup__input"
                    type="text"
                    name="uname"
                    id="uname"
                    required
                    autoComplete="off"
                    value={user.uname}
                    onChange={handleInput}
                  />
                  <label className="signup__label" htmlFor="uname">
                    Username
                  </label>
                </div>
                <div className="signup__field" style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="password"
                    className="signup__input"
                    name="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                  <label className="signup__label" htmlFor="password">
                    Password
                  </label>
                  <span className="eye eye-toggle" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="signup__field" style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    id="confirmPassword"
                    className="signup__input"
                    name="againPassword"
                    autoComplete="off"
                    value={user.againPassword}
                    onChange={handleInput}
                  />
                  <label className="signup__label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <span className="eye eye-toggle" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button type="submit">Sign up</button>

                <h2 className="mt-30">
                  Already have an account? <a href="/login">Sign in</a>
                </h2>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
