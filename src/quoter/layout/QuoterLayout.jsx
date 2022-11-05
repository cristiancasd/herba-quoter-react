import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { Navbar } from "../components/Navbar"
import { SideBar } from "../components/SideBar";

const drawerWidth=240;

export const QuoterLayout = ({children}) => {
  return (
    
    <Box sx={{display: 'flex'}}>
        {
          <Navbar  drawerWidth={drawerWidth} />
        }

        <SideBar drawerWidth={drawerWidth} />
        <Box
            component='main'
            sx={{flexGrow: 1, p:3}}>

            <Toolbar/>
            {children}
        </Box> 
    </Box>
  )
}
