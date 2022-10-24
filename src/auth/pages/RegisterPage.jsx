import { Button, Grid, TextField, Typography, Link } from "@mui/material"
import {Link as routerLink} from 'react-router-dom'
import { useForm } from "../../hooks/useForm"
import { AuthLayout } from '../layout/AuthLayout'

const registerFormFields={
  fullName: '',
  email: '',
  herbalifeLevel:'',
  rol:'',
  country:'',
  password:'',
  confirmPassword:'',
}

export const RegisterPage = () => {

  const {email, fullName, herbalifeLevel, rol, 
    country,password, confirmPassword, 
    onInputChange, formState}=useForm(registerFormFields) 

  const onSubmit=async (event)=>{ 
    event.preventDefault();
    console.log({registerEmail, registerPassword, registerConfirmPassword}) 
    dispatch(checkingAuthentication())
   } 

  return (  
        <AuthLayout title='Crear cuenta'>       
          <form onSubmit={onSubmit}>
            <Grid container>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Nombre completo"
                  type="text"
                  placeholder="Nombre completo"
                  fullWidth
                  name="fullName"
                  value={fullName}
                  onChange={onInputChange}
                  required
                  />
              </Grid>

              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Correo"
                  type="email"
                  placeholder="email@google.com"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  required
                  />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Rol"
                  type="text"
                  placeholder="Rol"
                  fullWidth
                  name="rol"
                  value={rol}
                  onChange={onInputChange}
                  required
                  />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Nacionalidad"
                  type="text"
                  placeholder="Nacionalidad"
                  fullWidth
                  name="country"
                  value={country}
                  onChange={onInputChange}
                  required
                  />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Nivel Herbalife"
                  type="text"
                  placeholder="Nacionalidad"
                  fullWidth
                  name="herbalifeLevel"
                  value={herbalifeLevel}
                  onChange={onInputChange}
                  required
                  />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Contraseña"
                  type="password"
                  placeholder="Password"
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  required
                  />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Confirmar contraseña"
                  type="password"
                  placeholder="confirmar password"
                  fullWidth
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onInputChange}
                  required
                  />
              </Grid>
 
              <Grid container spacing={2} sx={{mb:2, mt:1}}>              
                <Grid item xs={12} >
                  <Button variant='contained' fullWidth>
                      Crear Cuenta
                  </Button>
                </Grid>               
              </Grid>
              
              <Grid container direction='row' justifyContent='end'>
                <Link component={routerLink } color='inherit' to='/auth/login'>
                  Ya tengo cuenta
                </Link>
              </Grid>

            </Grid>
          </form>
        </AuthLayout>
  )
}
