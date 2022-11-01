import { SaveOutlined, SignalCellularNull, } from "@mui/icons-material"
import { Grid, Select, TextField, Typography, MenuItem, InputLabel } from "@mui/material"
import { ImageGallery } from "../components/imageGallery"

import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import { startCreateProduct, startUpdateProduct } from "../../store/quoter/thunks";
import Swal from 'sweetalert2'
import { setIsSaving } from "../../store/quoter/quoterSlice";

export const NewEditViewProduct = () => {
    
    const{errorMessage, categories, activeProductToEdit, activeProduct,
        statusQuoter, quoterProcess, }= useSelector(state=> state.quoter)


    const {title, description, pv,sku, image,
    pricepublic, price15, price25, categoryId,
    price35, price42, price50,  formState, onInputChange, onResetForm} =useForm(activeProductToEdit)

    
    
    const dispatch=useDispatch();

    const onClickSaveProduct = () =>{
        dispatch(setIsSaving(true));
        quoterProcess==='edit'
            ? dispatch(startUpdateProduct(formState, activeProduct.category))        
            : dispatch(startCreateProduct(formState));
    }

    useEffect(()=>{
        console.log('errorMessage en useEffect ',errorMessage)
        if(errorMessage!== undefined && errorMessage!== null){
          Swal.fire('Ocurrió un error', errorMessage, 'error')
        }
      },[errorMessage])
        
    useEffect(()=>{
        onResetForm()
      },[quoterProcess])


  return (
<>
<Box sx={{ flexGrow: 1 }}>
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}} item xs={12}  md={12}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'> {quoterProcess} Product</Typography>
        </Grid>
        <Grid item>
            <button 
            disabled={statusQuoter=='communicating'}
            onClick={onClickSaveProduct}
            color='primary' sx={{padding:2}}>
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
                name="title"
                value={title}
                onChange={onInputChange}
                placeholder="Ingrese Titulo"
                label='Titulo'              
                
                sx={{border:'none', mb:1}}
            />
            <TextField
                type='text'
                variant='filled'
                fullWidth
                name="description"
                onChange={onInputChange}
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
                    name="pricepublic"
                    onChange={onInputChange}
                    type='number'
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
                    type='number'
                    variant='filled'
                    fullWidth 
                    name="price15"
                    onChange={onInputChange}
                    value={price15}                
                    placeholder="Precio 15%"
                    label='Precio 15%'
                    sx={{border:'none', mb:1}}
                    />
                </Grid>

                <Grid item xs={12}  md={6}>
                    <TextField
                        type='number'
                        variant='filled'
                        fullWidth 
                        name="price25"
                        onChange={onInputChange}
                        value={price25}                
                        placeholder="Precio 25%"
                        label='Precio 25%'
                        sx={{border:'none', mb:1}}
                        />
                </Grid>

                <Grid item xs={12}  md={6}>
                    <TextField
                        type='number'
                        variant='filled'
                        fullWidth   
                        name="price35"
                        onChange={onInputChange}
                        value={price35}              
                        placeholder="Precio 35%"
                        label='Precio 35%'
                        sx={{border:'none', mb:1}}
                        />
                </Grid>

                <Grid item xs={12}  md={6}>
                    <TextField
                        type='number'
                        variant='filled'
                        fullWidth   
                        name="price42"
                        onChange={onInputChange} 
                        value={price42}             
                        placeholder="Precio 42%"
                        label='Precio 42%'
                        sx={{border:'none', mb:1}}
                        />
                </Grid>

                <Grid item xs={12}  md={6}>
                    <TextField
                        type='number'
                        variant='filled'
                        fullWidth   
                        name="price50"
                        onChange={onInputChange}
                        value={price50}              
                        placeholder="Precio 50%"
                        label='Precio 50%'
                        sx={{border:'none', mb:1}}
                        />
                </Grid>
                <Grid item xs={12}  md={6}>
                    <TextField
                        type='number'
                        step='2'
                        variant='filled'
                        fullWidth  
                        name="pv"
                        onChange={onInputChange} 
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
                        name="sku"
                        onChange={onInputChange}  
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
                        name='categoryId'                        
                        label="Categoría"                        
                        onChange={onInputChange}
                        value={categoryId}
                        >
                        {categories.map( category => (
                            <MenuItem 
                            key={category.id}
                            value={category.id}>{category.title}</MenuItem>
                        ))}                     
                    </Select>
                </Grid>
            </Grid>
    </Box>
    
</>
    
    

  
  )
}



   