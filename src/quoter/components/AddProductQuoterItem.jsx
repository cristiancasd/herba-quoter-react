import { Box, Button, Divider, Grid, ListItem, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTemporalQuoter } from "../../store/quoter/quoterSlice";

export const AddProductQuoterItem=(product)=> {

    const {temporalQuoter}=useSelector(state=> state.quoter);
      
    
    const dispatch = useDispatch();
    const [counter, setCounter]= useState(temporalQuoter[product.id] ? temporalQuoter[product.id] : '0' );

    const onInputChange=({target})=>{

        const newValue= +target.value>=0 || target.value==''
            ? (target.value) 
            : (0)

        if(newValue!=counter){
            dispatch(setTemporalQuoter({product:product.id, quantity:+newValue}))
            setCounter(newValue);
        }
    }

    const counterChange=(operation)=>{

        const newValue= operation=='increment'
            ? (+counter+1)
            : (counter>0 ? +counter-1 : 0);

        if(newValue!=counter){
            dispatch(setTemporalQuoter({product:product.id, quantity:newValue}))
            setCounter(newValue);
        }
    }

    


    
    return(
        <>
        <ListItem  disablePadding>
        <Box sx={{ 
            flexGrow: 1,
            marginTop: '15px',
            marginBottom: '15px'
        
        }}>
            <Grid container spacing={2} >
                <Grid item xs={12} md={8}>
                    <Typography variant='h6' noWrap component='div'>
                        {product.title}
                    </Typography> 
                    <Typography variant='h12' noWrap component='div'>
                        {product.description}
                    </Typography> 
                    <Typography variant='h12' noWrap component='div'>
                        Precio: $ {product.pricepublic}
                    </Typography> 
                    </Grid>
                
                <Grid  item xs={4} md={4}   sx={{maxHeight:'40px'}}>
                    <Stack direction="row" spacing={1} >
                            <Button 
                            variant='contained' 
                            size="small"
                            sx={{minWidth:'40px'}}
                            onClick={()=>counterChange('decrement')}
                            >-
                            </Button>

                            <TextField
                            type='number' 
                            min='0'
                            
                            variant='filled'
                            sx={{minWidth:'40px', minHeight:'30px'}}
                            value={counter}
                            margin='dense'
                            size='small'
                            onChange={onInputChange}
                            />
                            
                            <Button 
                            size="small"
                            variant='contained'
                            sx={{minWidth:'40px'}}
                            onClick={()=>counterChange('increment')}
                            >+</Button>
                    </Stack>
                </Grid>
                
            </Grid> 
        </Box>
        
        </ListItem>
        <Divider variant="middle" />
        </>
    )
 }