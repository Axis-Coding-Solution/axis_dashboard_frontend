import { Box, Paper, Stack, Typography } from '@mui/material'
import LinearDeterminate from './progess-bar'
import { style } from "../style"
const InfoCard = (props: any) => {
    const { AnalyticCardData } = props
    return (
        <Stack direction="row" gap={2} >
            {AnalyticCardData && AnalyticCardData.map((item: any, index: number) => (
                <Paper key={index} sx={style.infoCard} >
                    <Stack direction="row" justifyContent="space-between" >
                        <Typography variant='h4'>{item.title}</Typography>
                        <Typography variant='h4'>{item.percentage}</Typography>
                    </Stack>
                    <Typography> {item.value} </Typography>
                    <LinearDeterminate />
                    <Typography variant='h5'>{item.description}</Typography>
                </Paper>
            ))}
        </Stack>
    )
}

export default InfoCard
