import Selector from "@/components/Selector"
import UserCard from "@/components/user-card"
import { Box,TextField } from "@mui/material"
import AddUser from "./component/add-new-user"

const AllEmployee = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const style = {
        head: {
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
        }
    }
    return (
        <>
            <Box sx={style.head} >
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
                <Selector title="Select Company" />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Search"
                    multiline
                    maxRows={4}
                    sx={{ width: "100%" }}

                />
            </Box>
            <Box sx={{ textAlign: "right", }} >
                <AddUser />
            </Box>
            <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }} >
                {arr.map(() => (
                    <UserCard />
                ))}
            </Box>

        </>
    )
}

export default AllEmployee
