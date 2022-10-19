import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { QuoterRoutes } from '../quoter/routes/QuoterRoutes'

export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/auth/*' element={<AuthRoutes /> } />
        <Route path='/*' element={<QuoterRoutes/>} />
    </Routes>
  )
}
