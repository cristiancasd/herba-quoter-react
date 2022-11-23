import { SaveOutlined, SignalCellularNull, UploadOutlined, } from "@mui/icons-material"
import { Grid, Select, TextField, Typography, MenuItem, InputLabel, Button } from "@mui/material"
import { ImageGallery } from "../components/imageGallery"

import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect, useMemo, useRef, useState } from "react";
import { startCreateProduct, startUpdateProduct, startUploadingFiles } from "../../store/quoter/thunks";
import Swal from 'sweetalert2'
import { communicatingBackend, setIsSaving } from "../../store/quoter/quoterSlice";


const formValidations={
    title: [(value)=>value.length>=2, 'El titulo debe tener al menos dos caracteres' ],
    sku: [(value)=>value.length>=4 ,  'El sku debe tener al menos 4 caracteres' ],
  }

  
export const NewEditViewProduct = () => {
    
    const{errorMessage, categories, activeProductToEdit, activeProduct,
        statusQuoter, quoterProcess, }= useSelector(state=> state.quoter)

    const{user}= useSelector(state=> state.auth)
    const isReadOnly =user.rol=='user' ?{ readOnly: true } :{ readOnly: false }
    const isHired = user.rol=='user' ?{ display: 'none' } :{ display: '' }

    const {title, description, pv,sku, image,
    pricepublic, price15, price25, categoryId,
    price35, price42, price50,  formState, 
    isFormValid, titleValid, skuValid,
    onInputChange, onResetForm} =useForm(activeProductToEdit, formValidations)



    
    const fileInputRef=useRef();
    const dispatch=useDispatch();

    // Variable para saber si el formulario ya fue submitted
    const [formSubmitted, setFormSubmitted] = useState(false)


    const onClickSaveProduct = (event) =>{
        event.preventDefault();
        dispatch(setIsSaving(true));
        setFormSubmitted(true); //Cambiamos estado
        let err='';
        if(skuValid) err=' -'+skuValid;
        if(titleValid) err= err+' -'+titleValid;
        if(err!=='')Swal.fire('Llena correctamente el formulario', err, 'error');
        if(!isFormValid) return;
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

    const onFileInputChange=({target})=>{
        if(target.files===0)   return; 
            dispatch(startUploadingFiles(target.files,activeProduct,))
    }

  return (
<>
<form
    onSubmit={onClickSaveProduct}>
    <Box sx={{ flexGrow: 1 }}>
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}} item xs={12}  md={12}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'> {user.rol=='user' ? 'View' :quoterProcess} Product</Typography>
            </Grid>
            <Grid item>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display:'none'}}
                    />
                <Button
                    color="primary"
                    disabled={statusQuoter=='communicating' || quoterProcess=='create'}
                    onClick={()=>fileInputRef.current.click()}
                    style={isHired}
                >
                    <UploadOutlined sx={{fontSize: 30, mr:1}}/>
                    Subir Foto
                </Button>

                <Button 
                    disabled={statusQuoter=='communicating'}
                    type="submit" 
                    style={isHired}
                    color='primary' sx={{padding:2}}>
                        <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                        Guardar
                </Button>
            </Grid>    
        </Grid>


    </Box>
        

    <Box sx={{ flexGrow: 1 }}>

        
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
                    error={!!titleValid && formSubmitted /*Casilla roja por error*/}
                    helperText={titleValid /*Texto error bajo la casilla*/}
                    required
                    inputProps={isReadOnly}
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
                    sx={{border:'none', mb:1}}
                    inputProps={isReadOnly}
                />
                
            </Grid>    
        </Grid>
        <Grid container  spacing={2}>
                    <Grid item xs={6}  md={6}>
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
                        required
                        inputProps={isReadOnly}
                        />
                    </Grid>

                    <Grid item xs={6}  md={6}>
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
                        required
                        inputProps={isReadOnly}
                        />
                    </Grid>

                    <Grid item xs={6}  md={6}>
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
                            required
                            inputProps={isReadOnly}
                            />
                    </Grid>

                    <Grid item xs={6}  md={6}>
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
                            required
                            inputProps={isReadOnly}
                            />
                    </Grid>

                    <Grid item xs={6}  md={6}>
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
                            required
                            inputProps={isReadOnly}
                            />
                    </Grid>

                    <Grid item xs={6}  md={6}>
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
                            required
                            inputProps={isReadOnly}
                            />
                    </Grid>
                    <Grid item xs={6}  md={6}>
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
                            required
                            inputProps={isReadOnly}
                            />
                    </Grid>
                    <Grid item xs={6}  md={6}>
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
                            error={!!skuValid && formSubmitted /*Casilla roja por error*/}
                            helperText={skuValid /*Texto error bajo la casilla*/}
                            required
                            inputProps={isReadOnly}
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
                            inputProps={isReadOnly}
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
</form>
</>
    
    

  
  )
}



   