import { SaveOutlined, } from "@mui/icons-material"
import { Grid, Select, TextField, Typography, MenuItem, InputLabel } from "@mui/material"
import { ImageGallery } from "../components/imageGallery"

import Box from '@mui/material/Box';

export const NewEditView = () => {
    
    let category='proteína';
    const handleChange = (event) => {
        console.log('hola mundo')
        //setAge(event.target.value);
      };

  return (
<>
<Box sx={{ flexGrow: 1 }}>
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}} item xs={12}  md={12}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'> texto x</Typography>
        </Grid>
        <Grid item>
            <button color='primary' sx={{padding:2}}>
                <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                Guardar
            </button>
        </Grid>
    
    </Grid>


    <Grid container  spacing={2}  alignItems='center'>
        <Grid item xs={12}  md={3}>
            <ImageGallery  />
        </Grid>
    
        <Grid item xs={12}  md={9}>
            <TextField
                type='text'
                variant='filled'
                fullWidth
                
                placeholder="Ingrese Titulo"
                label='Titulo'
                sx={{border:'none', mb:1}}
            />
            <TextField
                type='text'
                variant='filled'
                fullWidth
                label='Descripción'
                multiline
                placeholder="Descripción"
                minRows={3}
            />
            
        </Grid>    
    </Grid>
</Box>
      

    <Box sx={{ flexGrow: 1 }}>
            <Grid container  spacing={2}>
                <Grid item xs={12}  md={6}>
                    <TextField
                    type='text'
                    variant='filled'
                    fullWidth                
                    placeholder="Precio Público"
                    label='Precio Público'
                    sx={{border:'none', mb:1}}
                    />
                </Grid>

                <Grid item xs={12}  md={6}>
                    <TextField
                    type='text'
                    variant='filled'
                    fullWidth                
                    placeholder="Precio 15%"
                    label='Precio 15%'
                    sx={{border:'none', mb:1}}
                    />
                </Grid>

                <Grid item xs={12}  md={6}>
                    <TextField
                        type='text'
                        variant='filled'
                        fullWidth                
                        placeholder="Precio 25%"
                        label='Precio 25%'
                        sx={{border:'none', mb:1}}
                        />
                </Grid>

                <Grid item xs={12}  md={6}>
                    <TextField
                        type='text'
                        variant='filled'
                        fullWidth                
                        placeholder="Precio 35%"
                        label='Precio 35%'
                        sx={{border:'none', mb:1}}
                        />
                </Grid>

                <Grid item xs={12}  md={6}>
                    <TextField
                        type='text'
                        variant='filled'
                        fullWidth                
                        placeholder="Precio 42%"
                        label='Precio 42%'
                        sx={{border:'none', mb:1}}
                        />
                </Grid>

                <Grid item xs={12}  md={6}>
                    <TextField
                        type='text'
                        variant='filled'
                        fullWidth                
                        placeholder="Precio 50%"
                        label='Precio 50%'
                        sx={{border:'none', mb:1}}
                        />
                </Grid>
                <Grid item xs={12}  md={6}>
                    <TextField
                        type='text'
                        variant='filled'
                        fullWidth                
                        placeholder="PV"
                        label='PV'
                        sx={{border:'none', mb:1}}
                        />
                </Grid>
                <Grid item xs={12}  md={6}>
                    <TextField
                        type='text'
                        variant='filled'
                        fullWidth                
                        placeholder="SKU"
                        label='SKU'
                        sx={{border:'none', mb:1}}
                        />
                </Grid>

                <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                    <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Categoría"
                        onChange={handleChange}
                        >
                        <MenuItem value={'proteína'}>Proteína</MenuItem>
                        <MenuItem value={'salud digestiva'}>salud digestiva</MenuItem>
                    </Select>
                </Grid>

            </Grid>
    </Box>
    
</>
    
    

  
  )
}



   