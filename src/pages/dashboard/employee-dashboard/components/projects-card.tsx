import { Box, Divider, Paper, Stack, Typography } from "@mui/material"

const ProjectCard = () => {
  
    return (
        <>
            <Typography variant="h4" > PROJECTS </Typography>
            <Paper sx={{ padding: "5px", width: "100%", paddingTop: "30px" }}>
                <Stack justifyContent={"space-around"} >
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "15px" }} >
                        <Typography variant="h4" > 71 </Typography>
                        <Typography variant="h5" >TOTAL TASKS</Typography>
                    </Box>
                    <Divider sx={{ width: "1px" }} color="gray" orientation="vertical" />
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "15px" }} >
                        <Typography variant="h4" > 71 </Typography>
                        <Typography variant="h5" >TOTAL TASKS</Typography>
                    </Box>
                </Stack>
                <Box sx={{ textAlign: "center", paddingTop: "20px" }} >
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "15px" }} >
                        <Typography variant="h4" > 71 </Typography>
                        <Typography variant="h5" >TOTAL TASKS</Typography>
                    </Box>
                </Box>

            </Paper>
        </>
    )
}

export default ProjectCard
