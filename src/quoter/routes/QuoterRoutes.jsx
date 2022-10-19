import { Navigate, Route, Routes } from 'react-router-dom'
import { QuoterPage } from '../pages/QuoterPage'

export const QuoterRoutes = () => {
  return (
    <Routes>
       <Route path='/' element={<QuoterPage />}/>
       <Route path='/*' element={<Navigate to="/"/>}/>
    </Routes>
  )
}
