import { Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startLoadingCategories, startLoadingProducts } from "../../store/quoter/thunks"
import { SideBarItemCategories } from "./SideBarItemCategories"
import { SideBarItemProducts } from "./sideBarItemProducts"

export const SideBar = ({drawerWidth= 240}) => {
    
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth) 
    const {products, categories, productsLoaded, categoriesLoaded } = useSelector(state => state.quoter) 

    useEffect(()=>{
        dispatch(startLoadingCategories())
        dispatch(startLoadingProducts())        
    },[]);

    if(productsLoaded!=='ok'|| categoriesLoaded!=='ok'){
        return(
          <h3>Cargando...</h3>
        )
    }

    let toShow=[];
    categories.map( category => {
        toShow.push(<SideBarItemCategories key={category.id}{ ...category}/>);
        products.map(product=>{
            if(product.category.id===category.id){
                toShow.push(<SideBarItemProducts key={product.id}{ ...product }/>);
            }
            return           
        })
        return
    });

  return (
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink:{sm:0}}}>
       <Drawer
            variant='permanent'
            open
            sx={{
                display:{xs:'block'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
            }}>
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    {user.name}
                </Typography>            
            <Divider/>
            </Toolbar>          
            <List> 
                {toShow}
            </List>
       </Drawer>
    </Box>
  )
}
