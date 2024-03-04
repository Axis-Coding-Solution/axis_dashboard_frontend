import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Label, UploadFile } from '@mui/icons-material';
import { Avatar, Stack, TextField } from '@mui/material';
import Selector from '@/components/Selector';
import user from "@/assets/images/client.jpg"

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
const arr = [1, 2, 3, 4, 5, 6, 7,]
export default function AddProject() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{ width: "12rem" }} >
                Add New Project
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
                            <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Project Name </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Project Name"
                            />
                        </Box>
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Client </Typography>
                            <Selector title="Select Company" />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px", paddingBottom: "20px" }} >
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Start Date </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                // label="Start Date"
                                type='date'
                            />
                        </Box>
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > End Date </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                type='date'
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px", paddingBottom: "20px" }} >
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Rate</Typography>
                            <Stack direction="row" gap={2} >
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="outlined-basic"
                                    label="Confirm Password"
                                />
                                <Selector
                                    title="Hourly"
                                />
                            </Stack>

                        </Box>
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Periority </Typography>
                            <Selector
                                title="High"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px", paddingBottom: "20px" }} >
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Add Project Leader </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Project Leader"
                            />
                        </Box>
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Team Leader </Typography>
                            <Avatar src={user} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px", paddingBottom: "20px" }} >
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Add Team </Typography>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-basic"
                                label="Add Team"
                            />
                        </Box>
                        <Box sx={{ width: "100%" }} >
                            <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Team  </Typography>
                            <Box sx={{ display: "flex", gap: "2px" }} >
                            {arr.map(( index: number ) => (
                                <Avatar src={user} key= {index} />
                                ) )}
                                </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Description </Typography>
                        <TextField
                            sx={{ width: "100%" }}
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            maxRows={4}
                        />
                    </Box>
                    <Box>
                        <Typography variant='subtitle1' sx={{ paddingBottom: "10px" }} > Upload Files </Typography>
                        <TextField type='file' />
                    </Box>
                    <Box sx={{ textAlign: "center" }} >
                        <Button variant="contained" onClick={handleClose}   > Submit </Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}