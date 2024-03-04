import { Avatar, Box, Paper, Typography } from '@mui/material'
import userImage from "@/assets/images/user.jpg"
const UserCard = ( props: any ) => {
    const {} = props
    const styles = {
        card: {
            display:"flex",
            flexDirection:"column",
            gap:"10px",
            justifyContent:"center",
            alignItems:"center",
            width:"23rem",
            // width: open ? "25rem" :  "23rem",
        },
        avatar:{
            width:"100px",
            height:"100px",
        },
        box:{
            textAlign:"center"
        },
        box1:{
            display:"flex",
            gap:"10px",
            justifyContent:"center",
            alignItems:"center",
        },
        btn:{
            display:"flex",
             backgroundColor:"#059669",
             color:"white",
             fontSize:"14px",
             padding:"5px",
             borderRadius:"5px",
        }
    }
  return (
    <Paper sx ={styles.card} >
      <Avatar src={userImage} sx = {styles.avatar} />
      <Typography> User Name </Typography>
      <Box sx = {styles.box} >
      <Typography variant="subtitle1" > Profession </Typography>
      </Box>
      {/* <Box sx = {styles.box1} >
        <Typography sx = {styles.btn} > Message  </Typography>
        <Typography sx = {styles.btn}  > View Profile </Typography>
      </Box> */}
     </Paper>

  )
}

export default UserCard
