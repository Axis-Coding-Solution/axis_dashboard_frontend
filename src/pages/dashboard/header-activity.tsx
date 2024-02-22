import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { useState } from "react";

 const HeaderActivity = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const pages = ['Products', 'Pricing', 'Blog'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    //   setAnchorElNav(event.currentTarget);
    // };
    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //   setAnchorElUser(event.currentTarget);
    // };
  
    // const handleCloseNavMenu = () => {
    //   setAnchorElNav(null);
    // };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    return (
        <Box
         sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton
        //    onClick={handleOpenUserMenu} 
           sx={{ p: 0 }}>
            <Avatar alt="Fransico" sx={{ width: 30, height: 30 }}  src="/static/images/avatar/2.jpg"  />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting}
             onClick={handleCloseUserMenu}
             >
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    ) 
}

export default HeaderActivity