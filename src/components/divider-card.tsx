import { Box, Divider, Paper, Stack, Typography } from "@mui/material"

const DividerCard = (props: any) => {
    const { title, text, text2, value, value2, finalValue, finalText } = props
    const style = {
        main: {
            padding: "5px", width: "100%", paddingTop: "30px"
        },
        row: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px"
        }
    }
    return (
        <>
            <Typography variant="h4" > {title} </Typography>
            <Paper sx={style.main}>
                <Stack justifyContent={"space-around"} >
                    <Box sx={style.row} >
                        <Typography variant="h4" >{value}</Typography>
                        <Typography variant="h5" >{text}</Typography>
                    </Box>
                    <Divider sx={{ width: "1px" }} color="gray" orientation="vertical" />
                    <Box sx={style.row}  >
                        <Typography variant="h4" >{value2}</Typography>
                        <Typography variant="h5" >{text2}</Typography>
                    </Box>
                </Stack>
                <Box sx={{ textAlign: "center", paddingTop: "20px" }} >
                    <Box sx={style.row}>
                        <Typography variant="h4" >{finalValue}</Typography>
                        <Typography variant="h5" >{finalText}</Typography>
                    </Box>
                </Box>

            </Paper>
        </>
    )
}

export default DividerCard
