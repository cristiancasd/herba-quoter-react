
import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setQuoterProcess, setActiveProductToEdit, setActiveCategoryToAdd } from "../../store/quoter/quoterSlice"
import { QuoterLayout } from "../layout/QuoterLayout"
import { NewEditViewCategory } from "../views/NewEditViewCategory"
import { NewEditViewProduct } from "../views/NewEditViewProduct"
import { NothingSelectedView } from "../views/NothingSelectedView"



export const QuoterPage = () => {

  const dispatch=useDispatch();
  const { productsLoaded, categoriesLoaded, activeProduct, activeCategory, quoterProcess, selection}= useSelector(state=>state.quoter)
  const{user}= useSelector(state=> state.auth)
  const isHired = user.rol=='user' ?{ display: 'none' } :{ display: '' }

  const startCreate=()=>{
    dispatch(setQuoterProcess('create'));
    
    if(activeProduct){
      const productReset =   {
        id: '',
        title: '',
        pricepublic: '',
        price15: '',
        price25: '',
        price35: '',
        price42: '',
        price50: '',
        pv: '',
        sku: '',
        image:'',
        description: '',
        categoryId: activeProduct.category.id
      };    
       dispatch(setActiveProductToEdit(productReset));
    }

    if(activeCategory){
      const categoryReset = {
        title: '',        
        description: '',
      };    
       dispatch(setActiveCategoryToAdd(categoryReset));
    }
  }


  return (
    <QuoterLayout>     
      {
        (productsLoaded && categoriesLoaded)
          ? (selection==='product'
              ?<NewEditViewProduct />
              :<NewEditViewCategory/>)
          : <NothingSelectedView />
      } 
      
      <IconButton
        disabled={quoterProcess=='create'}
        style={isHired}
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
