import MuiIcons from '@/components/mui-icons';
import { Box, Paper, Stack, Typography } from '@mui/material'

const TaskStatistics = () => {
    let taskData = [
        { category: "Total Tasks", value: 385 },
        { category: "Overdue Tasks", value: 19 }
    ];
    let taskData1 = [
        { category: "Completed Tasks", value: 166, color: "#4caf50" },
    { category: "Inprogress Tasks", value: 115, color: "#ff9800" },  
    { category: "Pending Tasks", value: 47, color: "#2196f3" }, 
    { category: "Review Tasks", value: 5, color: "#f44336" } 
    ];
    
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", gap: "30px", }} >
            <Typography variant='h4' >Task Statistics</Typography>
            <Stack direction="row" justifyContent="space-between" gap={2} >
                { taskData.map((item: any, index: number) => (
                    <Box key={index} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "5px", alignItems: "center", padding: "10px 15px", width: "100%",  border:" 1px solid #e0e0e0", borderRadius: "5px" }} >
                    <Typography variant='h5' > {item.category} </Typography>
                    <Typography variant='h4' > {item.value} </Typography>
                </Box>
                ))}
            </Stack>
            <Box sx={{width:"100%", display: "flex", flexDirection: "column", gap: "10px",  }} >
                { taskData1.map((item: any, index: number) => (
                    <Box key={index} sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", gap: "5px", alignItems: "center", width: "100%",  }} >
                    <Typography variant='h5' sx={{alignItems: "center", gap: "5px",}}>
                      <MuiIcons.AdjustIcon sx={{
                        color: item.color
                        }}
                         />   
                     {item.category}
                      </Typography>
                    <Typography variant='h4' > {item.value} </Typography>
                </Box>
                ))}
            </Box>

        </Paper>
    )
}

export default TaskStatistics
