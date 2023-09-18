import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";



const formData= {
  email:'djaramm@gmail.com',
  password: '123456',
  displayName: 'David Jaramillo'
}

const formValidations = {
  email:[ (value) => value.includes('@'),'el correo debe de tener un @'],
  password:[ (value) => value.length >= 6,'El password debe de tener 6 o mas letras'],
  displayName:[ (value) => value.length >= 1,'Debe de ingresar un nombre']
}


export const RegisterPage = () => {

 const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(false)

  const {status,errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo( ()=> status === 'checking',[status]);

  const {
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData,formValidations);



  
  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true);
    if (!isFormValid) return

    dispatch(startCreatingUserWithEmailPassword(formState))

  }

  return (

    <AuthLayout   title="Crea una nueva cuenta">
      
      <form onSubmit={onSubmit}
      className='animate__animated animate__fadeIn animate__faster '
      >

<Grid container>


<Grid item xs={12} sx={{ mt: 2 }}>
    <TextField label="nombre completo"
      type="text"
      placeholder="nombre completo"
      fullWidth
      name="displayName"
      value={displayName}
      onChange={onInputChange}
      error={!!displayNameValid && formSubmitted }
      helperText={displayNameValid}
    >
    </TextField>
  </Grid>

  <Grid item xs={12} sx={{ mt: 2 }}>
    <TextField label="correo"
      type="email"
      placeholder="something@something.com"
      fullWidth
      name="email"
      value={email}
      onChange={onInputChange}
      error={!!emailValid && formSubmitted}
      helperText={emailValid}
    >
    </TextField>
  </Grid>
  <Grid item xs={12} sx={{ mt: 2 }}>
    <TextField label="contraseña"
      type="password"
      placeholder="password"
      fullWidth
      name="password"
      value={password}
      onChange={onInputChange}
      error={!!passwordValid && formSubmitted}
      helperText={passwordValid}
    ></TextField>
  </Grid>


  <Grid container spacing={2} sx={{ mt:0.5,mb: 2 }}>

  <Grid item
   xs={12}
   display={!!errorMessage ? "": "none"}
   >
     <Alert severity="error">{errorMessage}</Alert>
    </Grid>

    <Grid item xs={12}>
      <Button 
      disabled = {isCheckingAuthentication}
      type="submit"
      variant="contained" 
      fullWidth>
       Crear cuenta
      </Button>

    </Grid>
  
  </Grid>
  <Grid
    container direction="row"
    justifyContent="end" 
    >
      <Typography sx={{mr:1}}>¿ya tienes cuenta?</Typography>

    <Link component={RouterLink} color="inherit" to="/auth/login">
      ingresar
    </Link>
  </Grid>




</Grid>
</form>




    </AuthLayout>

    

  )
};