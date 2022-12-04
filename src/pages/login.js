import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const theme = createTheme();
  
const Login = () => {
    const Navigate = useNavigate()
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
      try{
      // Tambahkan kode di bawah ini untuk mengambil data dari localstorage
      // 1. Lakukan Axios POST ke backend pada endpoint /login di bawah ini,
      // dengan parameter 'email' dan 'pass' yang didapat dari form (clue ada pada line 23 dan 24).
      const res = await axios.post(`${REACT_APP_BACKEND}/login`,{
        email: data.get('email'),
        password: data.get('password')
      })
      console.log(res.data)
      // simpan 'token' dan 'user' ke localStorage
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('id',res.data.id)
      localStorage.setItem('user',res.data.username)
      localStorage.setItem('email',res.data.email)
      // jika berhasil, set localStorage 'user' dan 'token' serta redirect ke halaman profile
      Navigate('/profile')
      // jika gagal, tampilkan alert 'Login Gagal'  
      } catch(err){
        alert('Login Gagal')
      }
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

export default Login
