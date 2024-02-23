import { Box,Paper, Typography } from '@mui/material'
import LinearDeterminate from './progess-bar'

const InfoCard = (props: any) => {
    const { AnalyticCardData } = props
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            width: "100%",

        }} >
            {AnalyticCardData && AnalyticCardData.map((item: any, index: number) => (
                <Paper key={index} sx={{ display: "flex", flexDirection: "column", gap: "10px", }} >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }} >
                        <Typography variant='h4' >{item.title}</Typography>
                        <Typography variant='h4' >{item.percentage}</Typography>
                    </Box>
                    <Typography> {item.value} </Typography>
                    <LinearDeterminate />
                    <Typography variant='h5' >{item.description}</Typography>
                </Paper>
            ))}
        </Box>
    )
}

export default InfoCard
