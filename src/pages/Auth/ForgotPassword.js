import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const [state, setState] = useState({ email: "", newPassword: "", confirmPassword: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    const { email, newPassword, confirmPassword } = state

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.")
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const userIndex = users.findIndex(user => user.email === email)

    if (userIndex === -1) {
      setErrorMessage("Email not found. Please register.")
      return
    }

    users[userIndex].password = newPassword
    localStorage.setItem('users', JSON.stringify(users))

    setSuccessMessage("Password reset successful! You can now login.")
    setErrorMessage("")
    setState({ email: "", newPassword: "", confirmPassword: "" })

    navigate("/auth/login")
  }

  return (
    <main className='auth py-5'>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card border-none mx-auto p-3 p-md-4" style={{ maxWidth: 400 }}>
              <h2 className="text-primary text-center mb-4">Forgot Password</h2>

              {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
              {successMessage && <p className="text-success text-center">{successMessage}</p>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <input type="email" className='form-control' placeholder='Enter email' name='email' value={state.email} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-4">
                    <input type="password" className='form-control' placeholder='Enter new password' name='newPassword' value={state.newPassword} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-4">
                    <input type="password" className='form-control' placeholder='Confirm new password' name='confirmPassword' value={state.confirmPassword} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <button className='btn btn-primary w-100'>Reset Password</button>
                    <p className='mb-0 mt-2'>Remember your password? <Link to="/auth/login">Login Now</Link></p>
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
