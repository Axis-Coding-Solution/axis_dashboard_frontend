import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import { style } from "../style";
const AnalyticCard = (props: any) => {
    const { AnalyticCardData } = props
    return (
        <Paper sx={style.analyticMain} >
            {AnalyticCardData && AnalyticCardData.map((item: any, index: number) => (
                <Paper key={index} >
                    <Stack direction="row" justifyContent="space-between">
                        <Avatar > {item.icon} </Avatar>
                        <Box sx={style.analyticCard} >
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
