import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [state, setState] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    const { email, password } = state
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(u => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      navigate("/")
    } else {
      setErrorMessage("Invalid email or password.")
    }
  }

  return (
    <main className='auth py-5'>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card border-none mx-auto p-3 p-md-4" style={{ maxWidth: 400 }}>
              <h2 className="text-primary text-center mb-4">Login</h2>

              {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <input type="email" className='form-control' placeholder='Enter email' name='email' value={state.email} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-4">
                    <input type="password" className='form-control' placeholder='Enter password' name='password' value={state.password} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <button className='btn btn-primary w-100'>Login</button>
                    <p className='mb-0 mt-2'>Don't have an account? <Link to="/auth/register">Register Now</Link></p>
                    <p className='mb-0 mt-2'>Forgot Password? <Link to="/auth/forgot-password">Reset Now</Link></p>
                    <p className='mb-0 mt-2'>Want to update Password? <Link to="/auth/update-password">Update Now</Link></p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
