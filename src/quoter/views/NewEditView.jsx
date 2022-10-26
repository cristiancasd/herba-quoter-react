import { SaveOutlined, SignalCellularNull, } from "@mui/icons-material"
import { Grid, Select, TextField, Typography, MenuItem, InputLabel } from "@mui/material"
import { ImageGallery } from "../components/imageGallery"

import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

export const NewEditView = () => {
    
    const{activeProduct, productsLoaded, categoriesLoaded, categories}= useSelector(state=> state.quoter)
    
    if(productsLoaded!=='ok'|| categoriesLoaded!=='ok'){
        return(
          <h3>Cargando...</h3>
        )
    }


    const productForm={
        ...activeProduct,
        category: activeProduct.category.title,
        user: activeProduct.user.fullname,
    }

    const {title, description, pv,sku, image,
    pricepublic, price15, price25,
    price35, price42, price50, category} =useForm (productForm)

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
                value={title}
                placeholder="Ingrese Titulo"
                label='Titulo'
                sx={{border:'none', mb:1}}
            />
            <TextField
                type='text'
                variant='filled'
                fullWidth
                value={description}
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
                    value={pricepublic}             
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
                    value={price15}                
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
                        value={price25}                
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
                        value={price35}              
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
                        value={price42}             
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
                        value={price50}              
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
                        value={pv}              
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
                        value={sku}            
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
                        value={activeProduct.category.id}
                        label="Categoría"
                        onChange={handleChange}
                        >
                        {categories.map( category => (
                            <MenuItem value={category.id}>{category.title}</MenuItem>
                        ))}                        
                    </Select>
                </Grid>

            </Grid>
    </Box>
    
</>
    
    

  
  )
}



   