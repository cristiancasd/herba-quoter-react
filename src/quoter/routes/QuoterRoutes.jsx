import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProductCategoryPage } from '../pages/ProductCategoryPage'
import { QuoterPage } from '../pages/QuoterPage'

export const QuoterRoutes = () => {
  const {quoterPage} = useSelector(state => state.quoter);
  console.log('quoterPage es ...', quoterPage);

  return (
    <Routes>
       <Route path='quoter' element={<QuoterPage />}/>
       <Route path='products' element={<ProductCategoryPage />}/>   
       <Route path='/*' element={<Navigate to="/quoter"/>}/>  
   </Routes>
  )
}
