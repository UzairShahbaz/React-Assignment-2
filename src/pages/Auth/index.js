import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import UpdatePassword from './UpdatePassword'

export default function Auth() {
    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='update-password' element={<UpdatePassword />} />
            <Route path='*' element={<h1>No Page, Auth Page Not Found, 404 Error</h1>} />
        </Routes>
    )
}
