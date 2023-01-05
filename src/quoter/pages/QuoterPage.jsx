
import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setQuoterProcess, setActiveProductToEdit, setActiveCategoryToAdd, setActiveQuoter, setActiveQuoterToEdit, setQuotersLoaded, setInitialQuoter } from "../../store/quoter/quoterSlice"
import { CheckingAuth } from "../../ui/components/CheckingAuth"
import { QuoterLayout } from "../layout/QuoterLayout"
import { NewEditViewCategory } from "../views/NewEditViewCategory"
import { NewEditViewProduct } from "../views/NewEditViewProduct"
import { NewEditViewQuoter } from "../views/NewEditViewQuoter"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { ViewAddProductsQuoter } from "../views/ViewAddProductsQuoter"



export const QuoterPage = () => {

  const dispatch=useDispatch();
  const { quoterProcess, activeQuoter, quoters, isAddProductQuoterProcess, quotersLoaded}= useSelector(state=>state.quoter)
  const{user}= useSelector(state=> state.auth)
  //const isHired = user.rol=='user'||isAddProductQuoterProcess ?{ display: 'none' } :{ display: '' }
  const isHired = isAddProductQuoterProcess ?{ display: 'none' } :{ display: '' }


  useEffect(() => {
    dispatch(setInitialQuoter(quoters[0]))
    dispatch(setActiveQuoter(quoters[0]))
    dispatch(setQuoterProcess('Edit'))
    dispatch(setQuotersLoaded(true))
  }, [])

  const startCreate=()=>{
    
    if (activeQuoter){
      const quoterReset={
        id:'',
        title:'',
        description:'',
        products:{},
        total:0,
      }
      dispatch(setActiveQuoter(quoterReset));
      dispatch(setActiveQuoterToEdit({title:'', description:''}));
    }
    dispatch(setQuoterProcess('Create'));
  } 


  if(!quotersLoaded){
    return <h3>Upload quoter Page ....</h3>
  }


  return (
    <QuoterLayout>    
      { 
        isAddProductQuoterProcess
          ? <ViewAddProductsQuoter/>
          : <NewEditViewQuoter/>
      } 
      
      
      
      <IconButton
        disabled={quoterProcess=='Create'}
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
