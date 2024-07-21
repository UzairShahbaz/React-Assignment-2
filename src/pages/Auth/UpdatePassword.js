import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdatePassword() {
  const [state, setState] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) {
      navigate("/auth/login")
    }
  }, [navigate])

  const handleSubmit = e => {
    e.preventDefault()

    const { oldPassword, newPassword, confirmPassword } = state
    const user = JSON.parse(localStorage.getItem('currentUser'))

    if (!user) {
      setErrorMessage("User not logged in. Please log in and try again.")
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.")
      return
    }

    if (user.password !== oldPassword) {
      setErrorMessage("Old password is incorrect.")
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const userIndex = users.findIndex(u => u.email === user.email)

    if (userIndex !== -1) {
      users[userIndex].password = newPassword
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('currentUser', JSON.stringify({ ...user, password: newPassword }))

      setSuccessMessage("Password updated successfully!")
      setErrorMessage("")
      setState({ oldPassword: "", newPassword: "", confirmPassword: "" })

      
    } else {
      setErrorMessage("An error occurred. Please try again.")
    }
  }

  return (
    <main className='auth py-5'>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card border-none mx-auto p-3 p-md-4" style={{ maxWidth: 400 }}>
              <h2 className="text-primary text-center mb-4">Update Password</h2>

              {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
              {successMessage && <p className="text-success text-center">{successMessage}</p>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <input type="password" className='form-control' placeholder='Enter old password' name='oldPassword' value={state.oldPassword} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-4">
                    <input type="password" className='form-control' placeholder='Enter new password' name='newPassword' value={state.newPassword} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-4">
                    <input type="password" className='form-control' placeholder='Confirm new password' name='confirmPassword' value={state.confirmPassword} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <button className='btn btn-primary w-100'>Update Password</button>
                    <p className='mb-0 mt-2'>Password Updated! <Link to="/auth/login">Login Now</Link></p>
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
