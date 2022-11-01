
import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setQuoterProcess, setActiveProductToEdit } from "../../store/quoter/quoterSlice"
import { QuoterLayout } from "../layout/QuoterLayout"
import { NewEditViewCategory } from "../views/NewEditViewCategory"
import { NewEditViewProduct } from "../views/NewEditViewProduct"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const QuoterPage = () => {

  const dispatch=useDispatch();
  const { productsLoaded, categoriesLoaded, activeProduct, quoterProcess}= useSelector(state=>state.quoter)

  const startCreate=()=>{
    const productReset =   {
      id: '',
      title: '',
      pricepublic: 0,
      price15: 0,
      price25: 0,
      price35: 0,
      price42: 0,
      price50: 0,
      pv: 0,
      sku: '',
      image:'',
      description: '',
      categoryId: activeProduct.category.id
    };
    dispatch(setQuoterProcess('create'));
    dispatch(setActiveProductToEdit(productReset));
  }

  return (
    <QuoterLayout>     
      {
        (productsLoaded && categoriesLoaded)
          ? (activeProduct
              ?<NewEditViewProduct />
              :<NewEditViewCategory/>)
          : <NothingSelectedView />
      } 
      
      <IconButton
        disabled={quoterProcess=='create'}
        onClick={startCreate}
        size='large'
        sx={{
          color:'white',
          backgroundColor: 'error.main',
          ':hover':{backgroundColor: 'error.main', 
                    opacity:0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}>
      <AddOutlined sx={{fontSize:30}}/>  
      </IconButton>
    </QuoterLayout>
  )
}
