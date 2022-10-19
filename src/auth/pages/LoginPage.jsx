import { useDispatch, useSelector } from 'react-redux'
import {Link as routerLink} from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import {Google} from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth/thunks'
import { useMemo } from 'react'

const configVar={
  email: 'algo@algo.com', password:'123456'
}
export const LoginPage = () => {


  
  //Usar Redux 
  const dispatch = useDispatch(); 
  //const {status} = useSelector(state => state.auth) 
  const {email, password, onInputChange, formState}=useForm(configVar) 
  
  //const isAuthenticating = useMemo(()=>status === 'checking', [status])

  const onSubmit=(event)=>{ 
    event.preventDefault(); 
    dispatch(checkingAuthentication()) //Función THUNKS, la cambiaremos
   } 

  const onGoogleSignIn = () => { 
    dispatch(startGoogleSignIn()) //Función THUNKS 
  }


  return (
        
        // AuthLayout contiene la caja en el medio y el fondo
        <AuthLayout title='Login'>
        {/*
        xs: Tamaño elementio en pantalla pequeña (12 es toda)
        sm  Tamaño elemento en pantalla grande(12 es toda)
        sx  Espacio padding {{mb: abajo, mt: arriba}}
        */}
          <form onSubmit={onSubmit}>
            <Grid container>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Correo"
                  type="email"
                  placeholder="email@google.com"
                  fullWidth/>
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Contraseña"
                  type="password"
                  placeholder="Password"
                  fullWidth/>
              </Grid>
 
              
              <Grid container spacing={2} sx={{mb:2, mt:1}}>              
                <Grid item xs={12} sm={6}>
                  <Button type='submit' variant='contained' fullWidth>
                      Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button  onClick={onGoogleSignIn} variant='contained' fullWidth>
                    <Google />
                      <Typography sx={{ml:1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Link component={routerLink} color='inherit' to='/auth/register'>
                  Crear una cuenta
                </Link>
              </Grid>
            </Grid>
          </form>
        </AuthLayout>   
  )
}
