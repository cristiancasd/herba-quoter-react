import { TurnedInNot , Stars, StartSharp} from '@mui/icons-material'
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar,  } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { setActiveProduct } from '../../store/quoter/quoterSlice'


export const SideBarItemProducts = (product) => {

 // const {products, categories } = useSelector(state => state.quoter) 
  const {title, description}=product
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



  //setActiveNote({title,body,id,date})
  const onClickNote =()=>{
      //dispatch(setActiveNote({title,body,id,date,imageURL}));  
      dispatch(setActiveProduct(product))
    }

  return (    
      <ListItem 
      disablePadding>
        <ListItemButton onClick={onClickNote}>
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