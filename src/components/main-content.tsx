import { Box } from '@mui/material'
import VerticalNavigationBar from './VerticalNavigationBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BreadCrumbs from "@/components/BreadCrumbs"

const MainContent = (props: any) => {
    const { open, toggle, } = props
    const { themeMode } = useSelector((store: any) => store.layout)
    return (
        <Box sx={{
            display: "flex", flexDirection: "row", height: "100%", paddingBottom: "50px",
            bgcolor: themeMode === "light" ? "#f3f4f6" : "#000026"
        }}>
            <VerticalNavigationBar open={open} toggle={toggle} setToggle={props.setToggle} />
            <Box sx={{
                display: "flex", flexDirection: "column",
                gap: "20px",
                width: "100%",
                // height: "100vh",
                padding: 3,
            }} >
                {/* <BreadCrumbs first="app" second="dashboard" third="Admin Dashboard" /> */}
                <Outlet />
            </Box>
        </Box>
    )
}

export default MainContent
