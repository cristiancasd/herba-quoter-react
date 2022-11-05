import { SaveOutlined, SignalCellularNull, } from "@mui/icons-material"
import { Grid, Select, TextField, Typography, MenuItem, InputLabel } from "@mui/material"
import { ImageGallery } from "../components/imageGallery"

import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import { startCreateCategory, startUpdateCategory } from "../../store/quoter/thunks";
import Swal from 'sweetalert2'
import { setIsSaving } from "../../store/quoter/quoterSlice";

export const NewEditViewCategory = () => {
    
    const{errorMessage, categories, activeCategory,
        statusQuoter, quoterProcess, }= useSelector(state=> state.quoter)

    const{user}= useSelector(state=> state.auth)
    const isReadOnly =user.rol=='user' ?{ readOnly: true } :{ readOnly: false }
    const isHired = user.rol=='user' ?{ display: 'none' } :{ display: '' }

    const {title, description,  formState, onInputChange, onResetForm} =useForm(activeCategory)

    // Variable para saber si el formulario ya fue submitted
    const [formSubmitted, setFormSubmitted] = useState(false)
    
    
    const dispatch=useDispatch();

    const onClickSaveCategory = (event) =>{
        event.preventDefault();
        setFormSubmitted(true);
        dispatch(setIsSaving(true));        
        quoterProcess==='edit'
            ? dispatch(startUpdateCategory(formState))      
            : dispatch(startCreateCategory(formState));
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
    <form
    onSubmit={onClickSaveCategory}>
    <Box sx={{ flexGrow: 1 }}>
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}} item xs={12}  md={12}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'> {user.rol=='user' ? 'View' :quoterProcess} Category</Typography>
            </Grid>
            <Grid item>
                <button 
                disabled={statusQuoter=='communicating'}
                type="submit" 
                style={isHired}
                color='primary' sx={{padding:2}}>
                    <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                    Guardar
                </button>
            </Grid>    
        </Grid>

        <Grid container  spacing={2}  alignItems='center'>
                
            <Grid item xs={12}  md={12}>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    name="title"
                    value={title}
                    onChange={onInputChange}
                    placeholder="Ingrese Titulo"
                    label='Titulo'              
                    inputProps={isReadOnly}
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
                    inputProps={isReadOnly}
                />
                
            </Grid>    
        </Grid>
    </Box>
    </form>

    
      

</>

  )
}



   