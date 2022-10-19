
import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { QuoterLayout } from "../layout/QuoterLayout"
import { NewEditView } from "../views/NewEditView"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const QuoterPage = () => {

  return (
    <QuoterLayout>      
      <NewEditView/> 
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
