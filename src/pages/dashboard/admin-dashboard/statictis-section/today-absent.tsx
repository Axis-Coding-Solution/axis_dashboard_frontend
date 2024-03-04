import { Avatar, Box, Chip, Paper, Stack, Typography } from '@mui/material'

const TodayAbsent = () => {
    const style = {
        main: {
            display: "flex",
                    flexDirection: " column",
                    gap: "10px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "5px",
                    padding: "20px",
        }
    }
    let martinLewisData = [
        {
            name: "Martin Lewis",
            date: "4 Mar 2022",
            leaveDate: "Leave Date",
            status: "Pending",
            color: "danger"
        },
        {
            name: "Martin Lewis",
            date: "4 Mar 2022",
            leaveDate: "Leave Date",
            status: "Pending",
            color: "success"
        },
        {
            name: "Martin Lewis",
            date: "4 Mar 2022",
            leaveDate: "Leave Date",
            status: "Pending",
            color: "primary"
        },
    ];
    const arr = [1,2,3]
    return (
        <Paper>
            <Typography variant='h4' > Today Absent </Typography>
            {arr.map(( index: number ) => (
            <Box sx={ style.main } key={index} >
                <Stack gap={2} >
                    <Avatar />
                    <Typography variant='h5' > John Doe </Typography>
                </Stack>
                <Stack justifyContent={"space-between"} >
                    <Typography>
                        <Typography variant='h5' > 4 March 2022 </Typography>
                        <Typography variant='h5' > Leave Data </Typography>
                    </Typography>
                    <Chip label="Pending" color='success' />
                </Stack>
             </Box>
            ))}

        </Paper>
    )
}

export default TodayAbsent
