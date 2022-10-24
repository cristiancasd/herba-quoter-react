import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { QuoterRoutes } from '../quoter/routes/QuoterRoutes'
import { chekAuthToken } from '../store/auth/thunks'


export const AppRouter = () => {
  const dispatch = useDispatch(); 
  const {status,} = useSelector(state => state.auth);

  useEffect(()=>{
    dispatch(chekAuthToken())
  },[])

  if(status==='checking'){
    return(
      <h3>Cargando...</h3>
    )
  }


  return (
    <Routes>
       
      {
        (status === 'not-authenticated')
          ? <Route path='/auth/*' element={<AuthRoutes /> } />
          : <Route path='/*' element={<QuoterRoutes/>} />
      }
      <Route path='/*' element={<Navigate to='/auth/login' /> } />
    </Routes>
  )
}
