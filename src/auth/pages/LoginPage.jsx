import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { Google } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material";

import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks/useForm";

const formData = {
  email: 'lozano@gmail.com',
  password: '123456'
}


export const LoginPage = () => {

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( formData );

  const onSubmit = (event) => {
    event.preventDefault();

    //No es esta la cción a despachar
    dispatch( startLoginWithEmailPassword( { email, password } ) );
  }

  const onGoogleSingIn = () => {
    dispatch( startGoogleSignIn() );
  }

  const { status, errorMessageLogin } = useSelector( state => state.auth );

  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  

  return (

    <AuthLayout title="Login">

      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster" >
        <Grid container>

          <Grid item xs={ 12 } sx={{ mb: 2 }}>

            <TextField 
              label="Email" 
              type="email" 
              placeholder="Email" 
              fullWidth 
              name="email"
              value={ email }
              onChange={ onInputChange }
              />
          
          </Grid>

          <Grid item xs={ 12 } sx={{ mb: 2 }}>
            
            <TextField 
              label="Password" 
              type="password" 
              placeholder="Password" 
              fullWidth 
              name="password"
              value={ password }
              onChange={ onInputChange }
            />
          
          </Grid>

          <Grid container spacing={ 2 }>

            <Grid item xs={ 12 } display={ (typeof errorMessageLogin === 'string') ? '' : 'none' } >
              <Alert severity="error" > 
                  { errorMessageLogin }
              </Alert>
            </Grid>

            <Grid item xs={ 12 } md={ 6 } >
              <Button 
                disabled={ isAuthenticating }
                variant="contained" 
                type="submit" 
                fullWidth
              > 
                  Login 
              </Button>
            </Grid>
            
            <Grid item xs={ 12 } md={ 6 } >
              <Button 
                disabled={ isAuthenticating }
                variant="contained" 
                onClick={ onGoogleSingIn } 
                fullWidth
              > 
                <Google /> 
                <Typography sx={{ ml: 1 }}> Google </Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }} >
            <Link component={ RouterLink } underline="none" color="inherit" to="/auth/register" > Crear una cuenta </Link>
          </Grid>


        </Grid>

      </form>

    </AuthLayout>
        
  )
}
