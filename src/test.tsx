import React, { useState } from 'react';
import { Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import Logo from "@/assets/images/axis-logo.jpeg"
// import Styles from './style';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (

    <Grid
      container
      spacing={0}
      direction="row"
      justifyContent="center"
      paddingY={5}
      // style={{ minHeight: '100vh }}
    // bgcolor={"green"}
    >
      
      <Grid item xs={12} sm={12} md={4} bgcolor={"#fff"} boxShadow={5}  
      style={{
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
      }}
      >
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
          padding: '50px',
        }} >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            gap: '20px',
          }} >
            <img src={Logo} alt="logo" width={100} />
            <Typography variant="h2" color={"#000"} fontSize={"1.3rem"} gutterBottom 
            sx={{
              backgroundColor:"red",
            }}
            >
              Sign In To Your Account
            </Typography>
          </div>
          <div>
            <Typography fontSize={"0.90rem"} borderBottom={"1px solid #059669"} width={"74%"} >
              Welcome back! Please enter your details.
            </Typography>
          </div>
          <div>
            <Typography mb={1} >
              Enter your Email
            </Typography>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              // margin="normal"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <Typography mb={1} >
              Enter your  Password
            </Typography>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              // margin="normal"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }} >
            <span style={{ color: "#059669", cursor: "pointer", borderBottom: "1px solid #059669" }}  >
              Forgot Password?
            </span>
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary" >
              Login
            </Button>
          </div>
          <div>

            <Typography align="center" color={"#000"} gutterBottom>

              Don't have an account? <a href="/app/register" style={{ color: "#059669" }}>Register</a>
            </Typography>
          </div>
        </form>
      </Grid>
      <Grid item xs={12} md={4} sm={12} bgcolor={"#059669"} boxShadow={5}
      style={{
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
      }}
     
      >
        <div style={{ width: "100%", height: "100%",}}>
          <div className="" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:"red",
            height: "100%",
            padding: "20px",
            color: "white",

          }}>
            <Typography color={"white"} >
              We are more than just a company
              <div style={{ height: "2px", width: "12rem", backgroundColor: "white", marginTop: "10px" }} ></div>
            </Typography>
            <p style={{ textAlign: "justify" }} >
              we redefine possibilities. Beyond mere solutions, we strive to empower
              your journey with innovation, reliability, and seamless experiences.
              Our commitment goes beyond conventional standards; it's about transforming
              challenges into opportunities.
            </p>
            <p style={{ textAlign: "justify" }} >
              With our tailored IT solutions, we don't just address your needs;
              we anticipate them. From cutting-edge technology to unparalleled support,
              we stand as your partner in progress.
            </p>

          </div>
        </div>

      </Grid>
    </Grid>

  );
};

export default LoginPage;
