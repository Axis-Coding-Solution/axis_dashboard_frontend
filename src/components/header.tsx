import { Box } from '@mui/material'
import { MdMarkEmailUnread } from "react-icons/md";
import { TbNotification } from "react-icons/tb";
import HeaderActivity from "../pages/dashboard/header-activity";
import logo from "@/assets/images/axis-logo.jpeg"
import MuiIcons from './mui-icons';

const Header = (props: any) => {
    const { open, setOpen } = props
    return (
        <Box
            paddingX={2}
            borderBottom={1}
            borderColor={"divider"}
            paddingY={1}
            position={"sticky"}
            top={0}
            sx={{
                zIndex: 1000,
                backgroundColor: "white",
                transition: "0.5s"
            }} >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: 10
                }}>
                <Box sx={{ display: "flex", alignItems: "center", }}>
                    <Box sx={{
                        // bgcolor: "red", 
                        width: open ? "120px" : "190px",
                        transition: "0.5s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                    }} >
                        <img src={logo} alt="logo" width={60} height={30} />
                    </Box>
                    {open === true ?

                        <MuiIcons.MenuIcon sx={{ marginTop: "10px", color: '#059669' }}
                            onClick={() => setOpen(!open)}
                        />
                        :
                        <MuiIcons.MenuOpenIcon sx={{ marginTop: "10px", color: '#059669' }}
                            onClick={() => setOpen(!open)}
                        />
                    }
                    <span style={{ marginLeft: "10px", fontWeight: "600", marginTop: "9px", color: "#059669" }} >Axis Coding Solutions</span>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px", }} >
                    <MdMarkEmailUnread size={20} color="#059669" />
                    <TbNotification size={20} color="#059669" />
                    <HeaderActivity />
                </Box>
            </Box>
        </Box>
    )
}

export default Header
