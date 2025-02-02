import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

// import { Google } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks/useForm";

import { validation, regex } from '../helpers';
import { startCreatingUserWithEmailPassword } from "../../store/auth";

const formData = {
  displayName: '',
  email: '',
  password: ''
}

// const formValidations = {
//   email: [ (value) => value.includes('@'), 'El correo debe tener un @.' ],
//   password: [ (value) => value.length >= 6, 'El password debe tener mas de 6 letras.' ],
//   displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.' ]
// }

const formValidationRegex = {
  email: [ (value) => validation(value, regex.email), 'El email debe tener un @.' ],
  password: [ (value) => validation(value, regex.password), 'La contraseña debe tener mas de 6 letras.' ],
displayName: [ (value) => validation(value, regex.displayName), 'El nombre es obligatorio.' ]
}


export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false); 

  const { status, errorMessageRegister } = useSelector( state => state.auth );
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid } = useForm( formData, formValidationRegex );

  const onSubmit = (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    if( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword( formState ) );

  }


  return (

    <AuthLayout title="Register">

      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster" >
        <Grid container>

          <Grid item xs={ 12 } sx={{ mb: 2 }}>
            <TextField 
              label="Nombre Completo" 
              type="text" 
              placeholder="Nombre Completo" 
              fullWidth 
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mb: 2 }}>
            <TextField 
              label="Email" 
              type="email" 
              placeholder="Email" 
              fullWidth 
              name="email"
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted }
              helperText={ emailValid }
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
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={ 2 }>

            <Grid item xs={ 12 } display={ (typeof errorMessageRegister === 'string') ? '' : 'none' }>
              <Alert severity="error">{ errorMessageRegister }</Alert>
            </Grid>

            <Grid item xs={ 12 }>
              <Button 
                disabled={ isCheckingAuth }
                type="submit" variant="contained" fullWidth> Crear Cuenta </Button>
            </Grid>
  
          </Grid>

          <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }} >
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={ RouterLink } underline="none" color="inherit" to="/auth/login" > Ingresar </Link>
          </Grid>


        </Grid>

      </form>

    </AuthLayout>
        
  )
}
