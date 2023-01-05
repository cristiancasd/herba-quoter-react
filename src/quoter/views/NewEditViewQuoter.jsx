import { AddShoppingCartOutlined, DeleteOutline, SaveOutlined, SignalCellularNull, Update, UploadOutlined, } from "@mui/icons-material"
import { Grid, Select, TextField, Typography, MenuItem, InputLabel, Button, 
    TableContainer, Table, TableHead, TableCell, TableRow, TableBody, DialogContent, DialogContentText, Dialog, DialogTitle, Divider, FormControl } from "@mui/material"
import Paper from '@mui/material/Paper';


import { ImageGallery } from "../components/imageGallery"

import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect,  useRef, useState } from "react";
import { startCreateQuoter,  startUpdateQuoter, startUploadingFiles } from "../../store/quoter/thunks";
import Swal from 'sweetalert2'
import { setActiveQuoter, setDeleteQuoterProduct, setIsAddProductQuoterProcess, setPriceDiscountQuoter,  } from "../../store/quoter/quoterSlice";


import { adaptNewActiveQuoter } from "../../helpers/activeQuoterChanges";


function createData(productSku, title, quantity, unitPrice, total) {
    return { productSku, title, quantity, unitPrice, total };
  }
  

const formValidations={
    title: [(value)=>value.length>=2, 'El titulo debe tener al menos dos caracteres' ],
  }

export const NewEditViewQuoter = () => {

    const{errorMessage, successMessage, statusQuoter, quoterProcess,
        activeQuoter, activeQuoterToEdit, 
        products, isScreenCel, quoters, priceDiscountQuoter,
        initialQuoter
     }= useSelector(state=> state.quoter)

 

    const {title, description, formState, isFormValid, titleValid,
    onInputChange, onResetForm} =useForm(activeQuoterToEdit, formValidations)

    const fileInputRef=useRef();
    const dispatch=useDispatch();


    const [quoterToShow, seQuoterToShow] = useState(initialQuoter)
    useEffect(() => {
        if(activeQuoter) seQuoterToShow(activeQuoter)
    }, [activeQuoter])

    if(!initialQuoter) return 'algo'

    let claves = Object.keys(quoterToShow.products); 
    
    const [pricesQuoter, setPricesQuoter]= useState(['pricepublic', 'price15', 'price25', 
      'price35', 'price42', 'price50'])

    
    const [productsQuoter, setProductsQuoter] = useState(quoterToShow.products);
    
    //set original products before quoter updated
    useEffect(() => {
      if(quoterProcess=='Edit'){
        const activeProductBeforeSaveUpdate = quoters.find(element => element.id == quoterToShow.id);
        setProductsQuoter(activeProductBeforeSaveUpdate.products)}
    }, []) 
    
    // set Products quoter when a new quoter is selected
    useEffect(() => {
      if(quoterToShow.title != title)setProductsQuoter(quoterToShow.products)
    }, [quoterToShow.title])
    

    // Temporal quoter table
    
    const [rows, setRows]=useState([])
    useEffect(() => {
      let rowsTemporal=[]

      for(let i=0; i< claves.length; i++){
          let productSku = claves[i];
          rowsTemporal.push(
          createData(
                  productSku,
                  quoterToShow.products[productSku].title, 
                  quoterToShow.products[productSku].quantity,
                  quoterToShow.products[productSku].unitPrice,
                  quoterToShow.products[productSku].total
              )
          
          )
      }
      
      setRows(rowsTemporal)
      
    }, [quoterToShow])
   
   
    const [formSubmitted, setFormSubmitted] = useState(false);
    const onClickSaveQuoter = (event) =>{
        event.preventDefault();
        setFormSubmitted(true); //Cambiamos estado
        let err='';
        if(titleValid) err=' -'+titleValid;
        if(err!=='')Swal.fire('Formulary incorrect', err, 'error');
        if(!isFormValid) return;
        quoterProcess==='Edit'
          ? dispatch(startUpdateQuoter({...quoterToShow, title, description}))        
          : dispatch(startCreateQuoter({...quoterToShow, title, description}));

        // Creo que los puedo quitar
        dispatch(setActiveQuoter({...quoterToShow, title, description}));
        setProductsQuoter(quoterToShow.products)
    }

    const deleteProductList=async (event, skuToDelete)=>{ 
        console.log('AQUIIII *****',{activeQuoter, quoterToShow})
        const newQuoterActive= await adaptNewActiveQuoter({activeQuoter:quoterToShow, products, skuToDelete, priceDiscountQuoter});
        dispatch(setActiveQuoter(newQuoterActive));
    }

    useEffect(()=>{
        if(errorMessage!== undefined && errorMessage!== null)
          Swal.fire('Error', errorMessage, 'error')
      },[errorMessage])

    useEffect(()=>{
      if(successMessage)
        Swal.fire({icon: 'success',title: successMessage, showConfirmButton: false,timer: 1500})
    }),[successMessage]
      
    // reset form and 
    useEffect(()=> onResetForm(),[quoterProcess])

    
    const onFileInputChange=({target})=>{

        if(target.files===0)   return; 
          Swal.fire('update image is not implemented yet', errorMessage, 'error')
        
            //dispatch(startUploadingFiles(target.files,activeProduct,))
    }

    const addNewProductsToQuoter=()=>{ 
      dispatch(setIsAddProductQuoterProcess(true))
    }

    const selectChange=({target})=>{
      dispatch(setPriceDiscountQuoter(target.value))
      console.log('AQUIIII *****',{activeQuoter, quoterToShow})
      const newActiveQuoter=adaptNewActiveQuoter({activeQuoter:quoterToShow,priceDiscountQuoter:target.value, products, quoterToShow})
      dispatch(setActiveQuoter(newActiveQuoter))
    }


  return (
  <>

  <form
      onSubmit={onClickSaveQuoter}>
      <Box sx={{ flexGrow: 1 }}>
          <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}} item xs={12}  md={12}>
              <Grid item>
                  <Typography fontSize={34} fontWeight='light'> {quoterProcess} Quoter</Typography>
                  <Typography fontSize={20} fontWeight='light'> {quoterToShow.title} </Typography>

                  
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
                      disabled={
                        statusQuoter=='communicating' ||
                        (quoterToShow.title==title && 
                          quoterToShow.description==description && 
                          quoterToShow.products==productsQuoter)
                       }
                      type="submit" 
                      color='primary' sx={{padding:2}}>
                          <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                          Save
                  </Button>
              </Grid>    
          </Grid>
      </Box>
          
      <Box sx={{ 
        backgroundColor: '#F1F4F1',
        padding: '10px',
        marginBottom:2,
        maxWidth: '100%'
        }}>



        <Grid container spacing={2}  alignItems='center' >
          <Grid item xs={6}  md={6}>
            <Button  
              variant="outlined"
              disabled={statusQuoter=='communicating'}
              onClick={addNewProductsToQuoter}
              color='primary' 
              sx={{marginBottom:2}}>
                <AddShoppingCartOutlined sx={{fontSize: 24, mr:1}}/>
                Products
            </Button>
          </Grid>
          <Grid item xs={6}  md={6}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Price</InputLabel>
              <Select
                fullWidth
                labelId="demo-select-small"
                id="demo-select-small"
                name='priceQuoter'                        
                label="Price"                        
                onChange={selectChange}
                value={priceDiscountQuoter}
              >
                  {pricesQuoter.map( price => (
                    <MenuItem 
                    key={price}
                    value={price}>{price}</MenuItem>
                  ))}                     
              </Select>
            </FormControl>
          </Grid>
        </Grid>


        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Prouduct</TableCell>
                  <TableCell >Qty</TableCell>
                  {(!isScreenCel)&&<TableCell >VU</TableCell>}
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
                    {!isScreenCel &&<TableCell >{row.unitPrice.toLocaleString('es-CO')}</TableCell>}
                    <TableCell >{row.total.toLocaleString('es-CO')}</TableCell>
                    <TableCell >
                      <Button onClick={(event)=> deleteProductList(event,row.productSku)} >
                      <DeleteOutline sx={{fontSize: 25, mr:0}}/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}


              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
        <Grid container  spacing={2}  alignItems='center'>
        <Grid item xs={12}  md={4}>
          <TableContainer component={Paper} sx={{marginTop:2}}>
            <Table>
                <TableBody>
                <TableRow>
                    <TableCell colSpan={1}>TOTAL COP</TableCell>
                    <TableCell align="center">$ {quoterToShow.total.toLocaleString('es-CO')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}>PV:</TableCell>
                    <TableCell align="center">{quoterToShow.pv}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
          </TableContainer>
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



   