import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
const AnalyticCard = (props: any) => {
    const { AnalyticCardData } = props
    return (
        <Paper sx={{ bgcolor: "#F3F4F6", padding: "0px",flexDirection: "row", }} >
            {AnalyticCardData && AnalyticCardData.map((item: any, index: number) => (
                <Paper key={index} >
                    <Stack direction="row" justifyContent="space-between">
                        <Avatar > {item.icon} </Avatar>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "end", gap: "5px" }}  >
                            <Typography variant='h3'>{item.quantity}</Typography>
                            <Typography variant='h4' >{item.name}</Typography>
                        </Box>
                    </Stack>

                </Paper>
            ))}
        </Paper>
    )
}

export default AnalyticCard
