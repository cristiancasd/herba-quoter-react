import { Button, Grid, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
  return (  
        <AuthLayout title='Crear cuenta'>       
          <form>
            <Grid container>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Nombre completo"
                  type="text"
                  placeholder="Nombre completo"
                  fullWidth/>
              </Grid>

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
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Confirmar contraseña"
                  type="password"
                  placeholder="confirmar password"
                  fullWidth/>
              </Grid>
 
              <Grid container spacing={2} sx={{mb:2, mt:1}}>              
                <Grid item xs={12} >
                  <Button variant='contained' fullWidth>
                      Crear Cuenta
                  </Button>
                </Grid>               
              </Grid> 
            </Grid>
          </form>
        </AuthLayout>
  )
}
