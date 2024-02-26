import { Avatar, Box, Paper, Typography } from '@mui/material'
import UserImage from "@/assets/images/avatar-13.jpg"

const Card = () => {
    const style = {
        card: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingX:"25px",
            width:"23rem"
        },
        gap:{
            display:"flex",
            flexDirection:"column",
            gap:"5px"
        }
    }
    const arr = [1, 2,3,4 ]
    return (
        <Paper sx={style.card}   >
            <Box sx={style.gap} >
                <Typography variant='h4'>Card</Typography>
                <Typography variant='subtitle1' >
                    1 open tasks, 9 tasks completed
                </Typography>
            </Box>
            <Typography>
                Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. When an unknown
                printer took a galley of type and scrambled it...
            </Typography>
            <Box sx={style.gap} >
                <Typography variant='h5'> Disclaimer </Typography>
                <Typography variant='subtitle1'>
                    17 Apr 2019
                </Typography>
            </Box>
            <Box sx={style.gap} >
                <Typography variant='h5'> Project Leader : </Typography>
                <Typography variant='h5'>
                    <Avatar src={UserImage} />
                </Typography>
            </Box>
            <Box sx={style.gap} >
                <Typography variant='h5'> Team : </Typography>
                <Typography variant='h4'>
                    {arr.map((index: number) => <Avatar src={UserImage} key={index} />)}
                </Typography>
            </Box>
        </Paper>
    )
}

export default Card
