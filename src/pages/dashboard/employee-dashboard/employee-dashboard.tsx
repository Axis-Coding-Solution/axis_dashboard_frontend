import { Avatar, Box, Paper, Typography } from "@mui/material"
import UserImage from "@/assets/images/client.jpg"
import muiIcons from "@/components/mui-icons"
import { style } from "./style"
import ListCard from "@/components/ListCard"
import DividerCardWithButton from "@/components/divider-card-button"
import DividerCard from "@/components/divider-card"
const EmployeeDashboard = () => {

  const data1 = [
    {
      title: "TODAY",
      icon: <muiIcons.HourglassEmptyOutlinedIcon />,
      text: "Richard Miles is off sick Today",
      Avatar: <Avatar src={UserImage} />

    },
    {
      title: "",
      icon: <muiIcons.NextWeekOutlinedIcon />,
      text: "You are away today",
      Avatar: <Avatar src={UserImage} />

    },
    {
      title: "",
      icon: <muiIcons.HomeOutlinedIcon />,
      text: "You are working from home today",
      Avatar: <Avatar src={UserImage} />

    },
    {
      title: "TOMORROW",
      icon: <muiIcons.NextWeekOutlinedIcon />,
      text: "2 people will be away tomorrow",
      Avatar: <Avatar src={UserImage} />

    },

    {
      title: "NEXT SEVEN DAYS",
      icon: <muiIcons.NextWeekOutlinedIcon />,
      text: "2 people are going to be away",
      Avatar: <Avatar src={UserImage} />
    },
    {
      title: "",
      icon: <muiIcons.StartOutlinedIcon />,
      text: "Your first day is going to be on Thursday",
      Avatar: <Avatar src={UserImage} />
    },
    {
      title: "",
      icon: <muiIcons.BusinessOutlinedIcon />,
      text: "It's Spring Bank Holiday on Monday",
      Avatar: <Avatar src={UserImage} />
    },


  ]
  return (
    <Box sx={style.main}>
      <Box sx={style.head} >
        <Avatar sx={style.avatar} src={UserImage} />
        <Box sx={style.column} >
          <Typography variant="h4" >Welcome, John Doe </Typography>
          <Typography variant="h5" > Monday, 20 May 2019 </Typography>
        </Box>
      </Box>
      <Box sx={style.body}>
        <Box sx={{ width: "60%" }} >
          {data1.map((item: any, index: number) => (
            <Box key={index} >
              <ListCard
                icon={item.icon}
                text={item.text}
                title={item.title}
                Avatar={item.Avatar}
                key={index}
              />
            </Box>
          ))}
        </Box>
        <Box sx={style.total} >
          <DividerCard
            title=" PROJECTS"
            value="71"
            value2="71"
            text="TOTAL TASKS"
            text2="TOTAL TASKS"
            finalValue="71"
            finalText="TOTAL TASKS"
          />
          <DividerCardWithButton title="YOUR LEAVE" value="4.5" value2="2.5" text="LEAVE TAKEN" text2="Remaining" action="Apply Leave" />
          <DividerCardWithButton title="YOUR TIME OFF ALLOWANCE" value="5.0 Hours" value2="15 Hours" text="APPROVED" text2="Remaining" action="Apply Time Off " />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }} >
            <Typography variant="h4" > UPCOMING HOLIDAY </Typography>
            <Paper sx={{ padding: "15px", width: "100%", textAlign: "center" }} >
              Fri 15 May 2022 - Good Friday
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box >

  )
}

export default EmployeeDashboard
