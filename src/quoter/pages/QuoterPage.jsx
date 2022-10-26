
import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { QuoterLayout } from "../layout/QuoterLayout"
import { NewEditView } from "../views/NewEditView"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const QuoterPage = () => {

  const dispatch=useDispatch();
  const {isSaving, activeQuoter, activeProduct}= useSelector(state=>state.quoter)


  return (
    <QuoterLayout>     

      {
        activeProduct
          ? <NewEditView />
          : <NothingSelectedView/>
      } 
      
      <IconButton
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
