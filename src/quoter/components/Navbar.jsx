import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";

export const Navbar = ({drawerWidth=240}) => {
  const dispatch = useDispatch(); 
  const logout = () => { 
    dispatch(startLogout()) //Función THUNKS 
  }
  return (
    <AppBar      
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)`},
        ml: {sm:`${drawerWidth}px`}
      }}>
      
      <Toolbar>
        <IconButton
            
            color='inherit'
            edge='start'
            sx={{mr:2, display:{sm:'none'}}}>
          <MenuOutlined/>
        </IconButton>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography variant='h6' noWrap component='div'>QuoterApp</Typography>
          <IconButton 
          color='error'
          onClick={logout} >            
            <LogoutOutlined/>
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
