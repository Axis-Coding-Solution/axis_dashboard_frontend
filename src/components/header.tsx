import { Box } from '@mui/material'
import HeaderActivity from "../pages/dashboard/header-activity";
import logo from "@/assets/images/axis-logo.jpeg"
import MuiIcons from './mui-icons';
import { useSelector } from 'react-redux';
import { setTheme } from '@/store/layout';
import { useAppDispatch } from '@/utils/hooks';
const Header = (props: any) => {
    const { themeMode } = useSelector((store: any) => store.layout)
    const { open, setOpen } = props
    const dispatch = useAppDispatch()
    console.log("headerState =", themeMode)
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
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px", }}>

                    <Box onClick={() => dispatch(setTheme(themeMode === "light" ? "dark" : "light"))} >
                        {themeMode === "light" ?
                            <MuiIcons.Brightness2OutlinedIcon />
                            :
                            <MuiIcons.ModeNightIcon />
                        }
                    </Box>
                    <MuiIcons.MarkEmailUnreadOutlinedIcon />
                    <MuiIcons.MarkChatUnreadOutlinedIcon />
                    <HeaderActivity />
                </Box>
            </Box>
        </Box>
    )
}

export default Header
