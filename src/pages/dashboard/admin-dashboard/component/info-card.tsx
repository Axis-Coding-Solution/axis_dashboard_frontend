import { Box, Typography } from '@mui/material'
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
                <Box sx={{
                    width: "100%",
                    height: "130px",
                    boxShadow: 5,
                    borderRadius: "10px",
                    paddingX: "15px",
                    paddingY: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                }} >
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }} >
                        <Typography>{item.title}</Typography>
                        <span>{item.percentage}</span>
                    </Box>
                    <p> {item.value} </p>
                    <LinearDeterminate />
                    <p>{item.description}</p>
                </Box>
            ))}
        </Box>
    )
}

export default InfoCard
