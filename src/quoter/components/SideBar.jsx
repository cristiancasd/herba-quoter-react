import { DirectionsRailwayFilledSharp, MenuOutlined } from "@mui/icons-material"
import { Divider, Drawer, Grid, IconButton, List, ListItem, 
    ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useMemo, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startLoadingCategories, startLoadingProducts, } from "../../store/quoter/thunks"
import { DrawerScreenSize } from "./DrawerScreenSize"    

export const SideBar = ({drawerWidth= 240}) => {
    
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth) 
    const {  productsLoaded, categoriesLoaded, } = useSelector(state => state.quoter) 

    useEffect(()=>{ 
        console.log('products and categorues loader ', productsLoaded, categoriesLoaded)
        if(productsLoaded!=='ok'|| categoriesLoaded!=='ok'){
            dispatch(startLoadingCategories())
            dispatch(startLoadingProducts())     
            console.log('ya terminé traer categorias y products')  
        }
    },[]);

    if(productsLoaded!=='ok'|| categoriesLoaded!=='ok'){

        return(
          <h3>Upload Side Bar...</h3>
        )
    }


    const variablesDrawer={
        userName: user.name,
        drawerWidth
    }

    console.log('vamos a renderizar SideBar')
      
  return (
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink:{sm:0}}}>
       {
        <DrawerScreenSize key={'123'}{ ...variablesDrawer }/>
       }
    </Box>
  )

  

}


