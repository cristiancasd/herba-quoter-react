import { TurnedInNot } from "@mui/icons-material"
import { Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"

export const SideBar = ({drawerWidth= 240}) => {
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
                    Cristian Salazar
                </Typography>
            
            <Divider/>
            </Toolbar>
            
            <Toolbar>
            <Typography variant='h7' noWrap component='div'>
                    Proteínas
            </Typography>
            </Toolbar>
            
            <List>
                {
                    ['Proteína personalizada','PDM','Beverage Mix','Rebuild Strength'].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text } />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
       </Drawer>
    </Box>
  )
}
