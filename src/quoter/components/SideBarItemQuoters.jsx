import { TurnedInNot , Stars, StartSharp, ArrowBack} from '@mui/icons-material'
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar,  } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { handleMobileOpen, setActiveProduct, setActiveQuoterToEdit, setActiveQuoter, setIsAddProductQuoterProcess} from '../../store/quoter/quoterSlice'


export const SideBarItemQuoters = (quoter) => {

  const {mobileOpen, isScreenCel} = useSelector(state => state.quoter) 

  const {title, description}=quoter;
  const dispatch = useDispatch();
  
  const newTitle = useMemo(() => {
    return title.length>15 
                ? title.substring(0,15)+'...'
                : title;
  }, [title])

  const newBody = useMemo(() => {
    return description.length>80
                ? description.substring(0,80)+'...'
                : description;
  }, [description])


  const onClickQuoter =()=>{
      dispatch(setActiveQuoter(quoter))
      dispatch(setActiveQuoterToEdit({title:quoter.title, description:quoter.description}))
      dispatch(setIsAddProductQuoterProcess(false))
      if(isScreenCel) dispatch(handleMobileOpen(!mobileOpen));
    }

  return ( 
  
      
      <ListItem 
      disablePadding>
        <ListItemButton onClick={onClickQuoter}>
          <ListItemIcon>
              <StartSharp />
          </ListItemIcon>
              <Grid container>
                  <ListItemText primary={ newTitle } />
                  <ListItemText secondary={ newBody } />
              </Grid>
        </ListItemButton>
      </ListItem>
  )
}