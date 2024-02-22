import { Avatar, Box, Card, Stack, Typography } from '@mui/material'
import { deepOrange, deepPurple } from '@mui/material/colors';
const AnalyticCard = (props: any) => {
    const { AnalyticCardData } = props
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            width: "100%",

        }} >
            {AnalyticCardData && AnalyticCardData.map((item: any, index: number) => (
                <Card key={index} sx={{}}>
                    <Stack direction="row" justifyContent="space-between" width={"15rem"} padding={2} > 
                        <Avatar sx={{ bgcolor: "#a7f3d0", color: "#059669" }}> {item.icon} </Avatar>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end", gap: "5px" }} >
                            <span style={{ color: "#000", fontWeight: "bold", fontSize: "20px" }} >{item.quantity}</span>
                            <Typography fontSize={14} >{item.name}</Typography>
                        </Box>
                    </Stack>

                </Card>
            ))}
        </Box>
    )
}

export default AnalyticCard
