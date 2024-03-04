import { Box, Button, Card, Container, Stack, TextField, Typography } from "@mui/material"
import Logo from "@/assets/images/axis-logo.jpeg"
import { Link } from "react-router-dom"
import { style } from "./style"
const LoginPage = () => {
  return (
    <Container sx={style.main}>
      <Card sx={style.card} >
        <Box sx = {style.boxCard} >
          <form style={style.cardContent} >
            <Box sx={style.head}>
              <img src={Logo} alt="logo" width={80} />
              <Typography variant="h2" fontSize={20} fontWeight={600} gutterBottom>
                Sign In To Your Account
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={13} borderBottom={"1px solid #059669"} width={"80%"} >
                Welcome back! Please enter your details.
              </Typography>
            </Box>
            <Box>
              <Typography mb={1}  >
                Enter your Email
              </Typography>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
              // margin="normal"
              />
            </Box>
            <Box>
              <Typography mb={1}  >
                Enter your  Password
              </Typography>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                // margin="normal"
                fullWidth
              />
            </Box>
            <Box sx={style.forgot} >
              <Typography variant="body2" >
                Forgot Password?
              </Typography>
            </Box>
            <Box sx={style.buttonBox} >
              <Link to="/app/main/admin-dashboard" >
                <Button
                  type="submit" variant="contained" color="primary" sx={style.button} >
                  Login
                </Button>
              </Link>
            </Box>
            <Box>
              <Typography align="center" color={"#000"} gutterBottom fontSize={13} >
                Don't have an account? <a href="/app/register">Register</a>
              </Typography>
            </Box>
          </form>
          {/* <Box sx={{ width: "40%" }} bgcolor={"#059669"} paddingX={7} paddingTop={10} color={"white"} >
              <Typography color={"white"} display={"flex"} flexDirection={"column"} alignItems={"center"} >
                We are more than just a company
                <Box style={{ height: "1px", width: "12rem", backgroundColor: "white", marginTop: "10px" }} ></Box>
              </Typography>
              <p style={{ fontSize: "14px" }} >
                we redefine possibilities. Beyond mere solutions, we strive to empower
                your journey with innovation, reliability, and seamless experiences.
                Our commitment goes beyond conventional standards; it's about transforming
                challenges into opportunities.
              </p>
              <p style={{ fontSize: "14px" }} >
                With our tailored IT solutions, we don't just address your needs;
                we anticipate them. From cutting-edge technology to unparalleled support,
                we stand as your partner in progress.
              </p>
  
            </Box> */}
        </Box>
      </Card>
    </Container>
  )
}

export default LoginPage