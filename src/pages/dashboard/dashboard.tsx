
import { Box} from "@mui/material";
import { useState } from "react";
import Header from "@/components/header";
import MainContent from "@/components/main-content";
import Footer from "@/components/Footer";
const Dashboard = () => {
    const [open, setOpen] = useState(false)
    const [toggle, setToggle] = useState(-1)
    return (
        <Box>
           <Header open={open} setOpen={setOpen} />
           <MainContent toggle={toggle} setToggle={setToggle} open={open}   />
            {/* <Footer /> */}
        </Box>
    );
};


export default Dashboard



















// import { AppBar, Avatar, Box, Breadcrumbs, Drawer, Toolbar, Typography, } from "@mui/material";
// import logo from "@/assets/images/axis-logo.jpeg"
// import user from "@/assets/images/user-a.webp"
// import { useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import { NavigationData } from "@/navigation";
// import IconButton from '@mui/material/IconButton';
// import { MdMarkEmailUnread } from "react-icons/md";
// import { TbNotification } from "react-icons/tb";
// import HeaderActivity from "./header-activity";
// import { GiHamburgerMenu } from "react-icons/gi";

// const Dashboard = () => {
//     const [open, setOpen] = useState(false)
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 flex: 1,
//             }}
//         >
//             <Box sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 width: open ? "0px" : "230px",
//                 transition: "width 0.5s",
//                 height: "100vh",
//                 paddingY: "20px",
//                 overflowY: "auto",
//                 scrollbarWidth: "none",
//                 // flex: 1,
//             }}
//                 boxShadow={2}
//             >
//                 <Box sx={{ display: "flex", justifyContent: "center" }}    >
//                     <img src={logo} alt="logo" width={70} height={40} />
//                 </Box>
//                 <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }} >
//                     <Avatar alt="Fransico" sx={{ width: 100, height: 100, borderRadius: "5px" }} src={user} />
//                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }} >
//                         <Typography variant="h6" color={"#000"} >Fransico</Typography>
//                         <Typography variant="h6" color={"gray"} fontSize={12} > Manager </Typography>
//                     </Box>
//                 </Box>
//                 <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "start", gap: "10px" }} >
//                     {NavigationData.map((item, index) => (
//                         <Link to={item.path} key={index} style={{ textDecoration: "none" }}  >
//                             <Typography key={index} color={"gray"} paddingY={1} paddingX={2}
//                                 sx={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "5px", width: "100%" }}
//                             >
//                                 {item.icon}
//                                 {item.name}
//                             </Typography>
//                         </Link>
//                     ))}
//                 </Box>


//             </Box>
//             <Box sx={{ width: "100%", height: "100vh", }} flex={1} >
//                 <Box>
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             paddingRight: 10,
//                             paddingLeft: 2,
//                             boxShadow: 2,
//                             paddingY: 1,
//                         }}>
//                         <GiHamburgerMenu size={20} onClick={() => setOpen(!open)} />
//                         <Box style={{ display: "flex", alignItems: "center", gap: "10px", }} >
//                             <MdMarkEmailUnread size={20} color="#059669" />
//                             <TbNotification size={20} color="#059669" />
//                             <HeaderActivity />
//                         </Box>
//                     </Box>

//                 </Box>
//                 <Box sx={{padding: 3 }} >
//                     <Box>
//                         <Breadcrumbs aria-label="breadcrumb" >
//                             <Link to={"/"} color="inherit" style={{ textDecoration: "none" }}  >
//                                 <Typography color="">
//                                     App
//                                 </Typography>
//                             </Link>
//                             <Link style={{ textDecoration: "none" }}
//                                 to={"/dashboard"}
//                                 color="inherit">
//                                 <Typography color="">
//                                     dashboard
//                                 </Typography>
//                             </Link>
//                             <Typography color="text.primary"> Admin </Typography>
//                         </Breadcrumbs>
//                     </Box>
//                     <Box sx={{ width: "100%", height: "100vh", }} >
//                         <Outlet />
//                     </Box>
//                 </Box>
//                 <Box boxShadow={2}
//                     sx={{ width: "100%", textAlign: "center", paddingY: 1, display: "flex", justifyContent: "center" }}
//                 >
//                     copy right @ 2024
//                     Header

//                 </Box>
//             </Box>
//         </Box>
//     );
// };


// export default Dashboard








