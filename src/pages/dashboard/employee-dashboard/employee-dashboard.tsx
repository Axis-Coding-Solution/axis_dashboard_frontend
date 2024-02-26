import { Avatar, Box, Paper, Stack, Typography } from "@mui/material"
import UserImage from "@/assets/images/avatar-13.jpg"
import muiIcons from "@/components/mui-icons"
import ProjectCard from "./components/projects-card"
import CommonCard from "./components/common-card"
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }} >
        <Avatar sx={{ width: 50, height: 50, borderRadius: "0px" }} src={UserImage} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }} >
          <Typography variant="h4" >Welcome, John Doe </Typography>
          <Typography variant="h5" > Monday, 20 May 2019 </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", gap: "70px" }}>
        <Box sx={{ width: "60%" }} >
          {data1.map((item: any, index: number) => (
            <Box key={index} paddingY={1} sx={{ display: "flex", flexDirection: "column", gap: "10px" }} >
              <Typography variant="h4"> {item.title} </Typography>
              <Paper sx={{ display: "flex", flexDirection: "row", gap: "10px", paddingY: "15px", width: "100%", }} >
                <Stack>
                  <Stack gap={2} >

                    <Typography variant="h5" > {item.icon} </Typography>
                    <Typography variant="h5" > {item.text} </Typography>
                  </Stack>
                  <Typography variant="h5" > {item.Avatar} </Typography>
                </Stack>
              </Paper>
            </Box>
          ))}
        </Box>
        <Box sx={{ width: "40%", display: "flex", flexDirection: "column", gap: "20px" }} >
          <ProjectCard />
          <CommonCard title="YOUR LEAVE" value="4.5" value2="2.5" text="LEAVE TAKEN" text2="Remaining" action="Apply Leave" />
          <CommonCard title="YOUR TIME OFF ALLOWANCE" value="5.0 Hours" value2="15 Hours" text="APPROVED" text2="Remaining" action="Apply Time Off " />
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
