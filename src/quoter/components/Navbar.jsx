import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Avatar, Box, Button, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import { useDispatch, useSelector,  } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { handleMobileOpen } from "../../store/quoter/quoterSlice";


const pages = ['Quoter', 'Categ/Prod', 'Admin'];
const settings = ['Profile', 'Edit Profile', 'Logout'];

export const Navbar = ({drawerWidth=240}) => {
  const dispatch = useDispatch();  

  const {mobileOpen } = useSelector(state => state.quoter)
  const {user } = useSelector(state => state.auth)
  const logout = () => { 
    dispatch(startLogout()) //Función THUNKS 
  }

  const handleDrawerToggle = () => { 
    dispatch(handleMobileOpen(!mobileOpen))  
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
            edge="start"
            sx={{mr: 2, display: {sm:'none'}}}
            onClick={handleDrawerToggle}>
          <MenuOutlined />
        </IconButton>
        
        <Grid container direction='row' justifyContent='space-between'>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <IconButton 
            color='error'
            onClick={logout} >            
            <LogoutOutlined/>
          </IconButton>



          <Box sx={{ flexGrow: 0 }}
          style={{display: 'none'}}>
            <Tooltip title="Open settings">
              <IconButton  sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>




        </Grid>
        
      </Toolbar>
    </AppBar>
  )
}
