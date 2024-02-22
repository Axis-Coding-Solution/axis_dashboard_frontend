import { Box, Button, Card, Container, Stack, TextField, Typography } from "@mui/material"
import Logo from "@/assets/images/axis-logo.jpeg"
import { Link } from "react-router-dom"
// import { CardStyles } from "./style";
const LoginPage = () => {
  return (
    <Container maxWidth={"lg"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", }}
    // sx={{ CardStyles }}
    >
      <Card sx={{ width: "75%", height: "83%", padding: "15px", boxShadow: 5, borderRadius: "10px", background: "rgba(240, 240, 240)", }} >
        <Card>
          <Stack direction={{ xs: "column", sm: "row" }} boxShadow={5} spacing={2} >
            <Box sx={{ width: "60%"}} >
              <form style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '20px',
              }} >
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: "center",
                  alignItems: "center",
                  gap: '15px',
                }} >
                  <img src={Logo} alt="logo" width={50} />
                  <Typography variant="h2" fontSize={15} fontWeight={600} gutterBottom>
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
                <Box style={{ display: "flex", justifyContent: "flex-end" }} >
                  <span style={{ color: "#059669", cursor: "pointer", borderBottom: "1px solid #059669" }}  >
                    Forgot Password?
                  </span>
                </Box>
                <Box>
                  <Link to="/app/main/admin-dashboard" >
                    <Button
                      type="submit" variant="contained" color="primary" >
                      Login
                    </Button>
                  </Link>
                </Box>
                <Box>

                  <Typography align="center" color={"#000"} gutterBottom fontSize={13} >
                    Don't have an account? <a href="/app/register" style={{ color: "#059669" }}>Register</a>
                  </Typography>
                </Box>
              </form>
            </Box>
            <Box sx={{ width: "40%" }} bgcolor={"#059669"} paddingX={7} paddingTop={10} color={"white"} >
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
              {/* <p>
                As an IT solutions company, the organization likely emphasizes innovation, problem-solving,
                and providing valuable technological solutions to its clients or customers.
              </p> */}
              {/* </Box> */}
            </Box>
          </Stack>
        </Card>
      </Card>
    </Container>
  )
}

export default LoginPage