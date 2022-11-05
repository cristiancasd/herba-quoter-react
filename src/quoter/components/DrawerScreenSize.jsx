import { TurnedInNot , Stars, StartSharp} from '@mui/icons-material'
import { Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography,  } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { handleMobileOpen, setScreenCel} from '../../store/quoter/quoterSlice'
import useMediaQuery from '@mui/material/useMediaQuery';
import { SideBarItemCategories } from './SideBarItemCategories'
import { SideBarItemProducts } from './sideBarItemProducts'

const buildMenu=(categories,products)=>{
  let toShowMenu=[]
  categories.map( category => {
    toShowMenu.push(<SideBarItemCategories key={category.id}{ ...category}/>);
      products.map(product=>{
          if(product.category.id===category.id){
            toShowMenu.push(<SideBarItemProducts key={product.id}{ ...product }/>);
          }
          return           
      })
    return
    });
    return toShowMenu;
}

export const DrawerScreenSize = (data) => {
  
  const {mobileOpen, isScreenCel, categories, products} = useSelector(state => state.quoter) 
  const{userName,menuProductosCategorias, drawerWidth }=data;
  //const toShowMenu= useMemo((() => buildMenu(categories,products),[products]))
  const dispatch = useDispatch();
  
  let toShowMenu=[];
  categories.map( category => {
    toShowMenu.push(<SideBarItemCategories key={category.id}{ ...category}/>);
      products.map(product=>{
          if(product.category.id===category.id){
            toShowMenu.push(<SideBarItemProducts key={product.id}{ ...product }/>);
          }
          return           
      })
    return
    });

  const toShow=
  <>
      <Toolbar>
          <Typography variant='h6' noWrap component='div'>
              {userName}
          </Typography>            
              <Divider/>
      </Toolbar>          
      <List> 
          {
            toShowMenu
          //menuProductosCategorias
        }


        
      </List>
  </>

const handleDrawerToggle = () => {
  dispatch(handleMobileOpen(!mobileOpen))
};   
const wideScreenBig= (useMediaQuery('(min-width:600px)'))
///if (wideScreenBig=== isScreenCel) dispatch(setScreenCel(!wideScreenBig));

useEffect(() => {
  if (wideScreenBig=== isScreenCel) dispatch(setScreenCel(!wideScreenBig));
}, [wideScreenBig])

  
  return (    
    <>
      {
        !isScreenCel
          ? (<Drawer
              variant= "permanent"
              open   
              sx={{ display: { xs: 'block'},'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}
              >
              {toShow}               
          </Drawer>)

          : (<Drawer
              variant= "temporary"
              open = {mobileOpen}
              onClose = {handleDrawerToggle}
              ModalProps = {{keepMounted: true,}}   
              sx={{ display: { xs: 'block',sm: 'none'},
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}
              >
              {toShow}
            </Drawer>)
      }
    </>
  )
}