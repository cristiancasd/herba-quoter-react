import { TurnedInNot , Stars, StartSharp, StarOutlined} from '@mui/icons-material'
import { Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography,  } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { handleMobileOpen, setIsAddProductQuoterProcess, setOrderProducts, setScreenCel} from '../../store/quoter/quoterSlice'
import useMediaQuery from '@mui/material/useMediaQuery';
import { SideBarItemCategories } from './SideBarItemCategories'
import { SideBarItemProducts } from './sideBarItemProducts'
import { SideBarItemQuoters } from './SideBarItemQuoters'


export const DrawerScreenSize = (data) => {
  
  const {mobileOpen, isScreenCel, categories, products, quoters, activeQuoter} = useSelector(state => state.quoter) 
  const{userName, menuProductosCategorias, drawerWidth }=data;
  const dispatch = useDispatch();
 
  const onClickQuoter =()=>{
    dispatch(setIsAddProductQuoterProcess(true))
  }
  let toShowMenu=[];
  
  if(activeQuoter){ 
    quoters.map(quoter=>{
      toShowMenu.push(<SideBarItemQuoters key={quoter.id}{ ...quoter}/>);
    })
  }else{    
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
  }

  const toShow=
  <>
      <Toolbar>
          <Typography variant='h6' noWrap component='div'>
              {userName}
          </Typography>              
      </Toolbar>
      <Divider variant="middle" /> 
      <List> 
      
          {
            toShowMenu
          }
      </List>
  </>

const handleDrawerToggle = () => {
  dispatch(handleMobileOpen(!mobileOpen))
};   
const wideScreenBig= (useMediaQuery('(min-width:600px)'))

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