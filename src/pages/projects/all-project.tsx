import { Box, Typography } from "@mui/material";
import Card from "./component/card";
import AddProject from "./component/modal";
const AllProjects = () => {
    const arr = [1, 2,3,4 ]
    const style = {
        card: {
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
        },
        box:{
            textAlign:"right"
        }
    }
    return (
        <>
            <Typography variant="h4"> All Projects </Typography>
            <Box sx = {style.box} >
            <AddProject />
            </Box>
            <Box sx={style.card} >
                {arr.map((index: number) => <Card key={index} />)}
            </Box>
        </>
    )
}
export default AllProjects;