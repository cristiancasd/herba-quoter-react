import { TurnedInNot } from '@mui/icons-material'
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar,  } from '@mui/material'
import React, { useMemo } from 'react'
import { setActiveCategory } from '../../store/quoter/quoterSlice';


export const SideBarItemCategories = (category) => {
  const {title, id, description}=category;
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

  const onClickNote =()=>{
    dispatch(setActiveCategory(category))  
  }

  return (    
      <ListItem 
      disablePadding>
        <ListItemButton onClick={onClickNote}>
              <Grid container>
                  <ListItemText primary={ newTitle } />
              </Grid>
        </ListItemButton>
      </ListItem> 
  )
}