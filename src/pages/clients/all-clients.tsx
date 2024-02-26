import Selector from "@/components/Selector"
import AddClient from "@/components/modal"
import { Box, Button, TextField } from "@mui/material"
import ClientCard from "./components/Card"

const AllClient = () => {
    const arr = [1, 2, 3, 4,5,6,7,8,9,10]
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px", }} >
                <TextField
                    id="outlined-multiline-flexible"
                    label="Client Id"
                    multiline
                    maxRows={4}
                    sx={{ width: "100%" }}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Client Name"
                    multiline
                    maxRows={4}
                    sx={{ width: "100%" }}

                />
                <Selector title = "Select Company" />
                <TextField

                    id="outlined-multiline-flexible"
                    label="Search"
                    multiline
                    maxRows={4}
                    sx={{ width: "100%" }}

                />
            </Box>
            <Box sx={{ textAlign: "right", }} >
                <AddClient />
            </Box>
            <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }} >
                {arr.map(() => (
                    <ClientCard />
                ))}
            </Box>

        </>
    )
}

export default AllClient
