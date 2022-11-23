import { SaveOutlined, SignalCellularNull, UploadOutlined, } from "@mui/icons-material"
import { Grid, Select, TextField, Typography, MenuItem, InputLabel, Button, 
    TableContainer, Table, TableHead, TableCell, TableRow, TableBody, DialogContent, DialogContentText, Dialog, DialogTitle, Divider } from "@mui/material"
import Paper from '@mui/material/Paper';


import { ImageGallery } from "../components/imageGallery"

import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect, useMemo, useRef, useState } from "react";
import { startCreateProduct, startUpdateProduct, startUploadingFiles } from "../../store/quoter/thunks";
import Swal from 'sweetalert2'
import { communicatingBackend, setDeleteQuoterProduct, setIsAddProductQuoterProcess, setIsSaving, setTemporalQuoter } from "../../store/quoter/quoterSlice";

function createData(productId, title, quantity, unitPrice, total) {
    return { productId, title, quantity, unitPrice, total };
  }
  

const formValidations={
    title: [(value)=>value.length>=2, 'El titulo debe tener al menos dos caracteres' ],
  }

  let rows=[]
export const NewEditViewQuoter = () => {
    
    const{errorMessage, statusQuoter, quoterProcess,
        activeQuoter, activeQuoterToEdit, temporalQuoter
     }= useSelector(state=> state.quoter)

    const {title, description, formState, isFormValid, titleValid,
    onInputChange, onResetForm} =useForm(activeQuoterToEdit, formValidations)

    const fileInputRef=useRef();
    const dispatch=useDispatch();
    
    const productsQuoter={...activeQuoter.products}
    let claves = Object.keys(productsQuoter); // claves = ["nombre", "color", "macho", "edad"]
    rows=[]
    
    for(let i=0; i< claves.length; i++){
        let productId = claves[i];

        dispatch(
            setTemporalQuoter(
              {
                product: productId, 
                quantity: productsQuoter[productId].quantity
              }
            )
        )

        rows.push(
            createData(
                productId,
                productsQuoter[productId].title, 
                productsQuoter[productId].quantity,
                productsQuoter[productId].unitPrice,
                productsQuoter[productId].total
            ),
        )
        
    }
    
   


    

    // Variable para saber si el formulario ya fue submitted
    const [formSubmitted, setFormSubmitted] = useState(false)


    const onClickSaveProduct = (event) =>{
        event.preventDefault();
        dispatch(setIsSaving(true));
        setFormSubmitted(true); //Cambiamos estado
        let err='';
        if(titleValid) err=' -'+titleValid;
        if(err!=='')Swal.fire('Llena correctamente el formulario', err, 'error');
        if(!isFormValid) return;
    }

    const deleteProductList=(event, productId)=>{
        console.log('id a borrar', productId)
        if(activeQuoter.products[productId]) dispatch(setDeleteQuoterProduct(productId))
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
            //dispatch(startUploadingFiles(target.files,activeProduct,))
    }


    const addNewProductsToQuoter=()=>{
      dispatch(setIsAddProductQuoterProcess(true))

    }

  return (
  <>




  <form
      onSubmit={onClickSaveProduct}>
      <Box sx={{ flexGrow: 1 }}>
          <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}} item xs={12}  md={12}>
              <Grid item>
                  <Typography fontSize={39} fontWeight='light'> {quoterProcess} Quoter</Typography>
                  <Button  
                      disabled={statusQuoter=='communicating'}
                      onClick={addNewProductsToQuoter}
                      color='primary' sx={{padding:2}}>
                          <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                          Add Product
                  </Button>
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
                  >
                      <UploadOutlined sx={{fontSize: 30, mr:1}}/>
                      Subir Foto
                  </Button>

                  <Button 
                      disabled={statusQuoter=='communicating'}
                      type="submit" 
                      color='primary' sx={{padding:2}}>
                          <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                          Guardar
                  </Button>
              </Grid>    
          </Grid>


      </Box>
          


      <Box sx={{ flexGrow: 1 }}>
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Prouduct</TableCell>
              <TableCell >Qty</TableCell>
              <TableCell >VU</TableCell>
              <TableCell >VT</TableCell>
              <TableCell >Del</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell >{row.quantity}</TableCell>
                <TableCell >{row.unitPrice}</TableCell>
                <TableCell >{row.total}</TableCell>
                <TableCell ><Button onClick={(event)=> deleteProductList(event,row.productId)} >x</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
                  />
                  
              </Grid>    
          </Grid>
      </Box>
  </form>
  </>
  )
}



   