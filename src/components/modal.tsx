import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Label } from '@mui/icons-material';
import { TextField } from '@mui/material';

const style = {

    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,

    p: 4,
};

export default function AddClient() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{width:"11rem"}} >
                Add New Client
            </Button>
            <Modal

                open={open}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid white", }}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <Box sx={style} >
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px", paddingBottom: "20px" }} >
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='h5' sx={{ paddingBottom: "10px" }} > First Name </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="First Name"
                            />
                        </Box>
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='h5' sx={{ paddingBottom: "10px" }} > Last Name </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Last Name"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px", paddingBottom: "20px" }} >
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='h5' sx={{ paddingBottom: "10px" }} > Email </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Email"
                            />
                        </Box>
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='h5' sx={{ paddingBottom: "10px" }} > Password </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Password"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px", paddingBottom: "20px" }} >
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='h5' sx={{ paddingBottom: "10px" }} > Confirm Password </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Confirm Password"
                            />
                        </Box>
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='h5' sx={{ paddingBottom: "10px" }} > Client ID </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Client ID"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px", paddingBottom: "20px" }} >
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='h5' sx={{ paddingBottom: "10px" }} > Phone </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Phone"
                            />
                        </Box>
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='h5' sx={{ paddingBottom: "10px" }} > Company Name </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Company Name"
                            />
                        </Box>
                    </Box>
                    <Box sx = {{textAlign: "center"}} >
                        <Button variant="contained" onClick={handleClose}   > Submit </Button>
                    </Box>
                
                </Box>
            </Modal>
        </div>
    );
}