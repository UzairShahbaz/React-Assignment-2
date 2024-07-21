import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [state, setState] = useState({ fullName: "", email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    let { fullName, email, password } = state

    
    const users = JSON.parse(localStorage.getItem('users')) || []

   
    const userExists = users.some(user => user.email === email)

    if (userExists) {
      setErrorMessage("Email is already registered. Please login.")
      return
    }

    
    users.push({ fullName, email, password })


    localStorage.setItem('users', JSON.stringify(users))

   
    setSuccessMessage("Registration successful! You can now login.")
    setErrorMessage("")
    
    
    setState({ fullName: "", email: "", password: "" })
  }

  return (
    <main className='auth py-5'>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card border-none mx-auto p-3 p-md-4" style={{ maxWidth: 400 }}>
              <h2 className="text-primary text-center mb-4">Register</h2>

              {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
              {successMessage && <p className="text-success text-center">{successMessage}</p>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <input type="text" className='form-control' placeholder='Enter full name' name='fullName' value={state.fullName} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-4">
                    <input type="email" className='form-control' placeholder='Enter email' name='email' value={state.email} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-4">
                    <input type="password" className='form-control' placeholder='Enter password' name='password' value={state.password} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <button className='btn btn-primary w-100'>Register</button>
                    <p className='mb-0 mt-2'>Already have an account? <Link to="/auth/login">Login Now</Link></p>
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
