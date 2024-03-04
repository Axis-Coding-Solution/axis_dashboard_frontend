import { Avatar, Box, Paper, Stack, Typography } from "@mui/material"

const ListCard = (props: any) => {
    const style = {
        main: {
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        },
        paper: {
            padding: "15px",
            width: "100%"
        }
    }
    const { key, Avatar, text, title, icon } = props
    return (
        <Box key={key} paddingY={1} sx={style.main} >
            <Typography variant="h4"> {title} </Typography>
            <Paper sx={style.paper} >
                <Stack>
                    <Stack gap={2} >
                        <Typography variant="h5" > {icon} </Typography>
                        <Typography variant="h5" > {text} </Typography>
                    </Stack>
                    <Typography variant="h5" > {Avatar} </Typography>
                </Stack>
            </Paper>
        </Box>
    )
}

export default ListCard
