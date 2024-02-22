import { Box } from '@mui/material'
import VerticalNavigationBar from './VerticalNavigationBar'
import { Outlet } from 'react-router-dom'

const MainContent = (props: any) => {
    const { open, toggle, } = props
    return (
        <Box sx={{ display: "flex", lexDirection: "row", height: "100%", paddingBottom: "50px", }}>
            <VerticalNavigationBar open={open} toggle={toggle} setToggle={props.setToggle}   />
            <Box sx={{ width: "100%", backgroundColor: "#f3f4f6" }} >
                <Outlet />
            </Box>
        </Box>
    )
}

export default MainContent
