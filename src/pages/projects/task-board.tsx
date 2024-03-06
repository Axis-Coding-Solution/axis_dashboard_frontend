import BreadCrumbs from "@/components/BreadCrumbs";
import { Avatar, Box, Button, Typography } from "@mui/material";
import user from "@/assets/images/client.jpg";
import LinkIcon from "@mui/icons-material/Link";
import LinearDeterminate from "../dashboard/admin-dashboard/component/progess-bar";
import Task from "./Task";


const arr = [1, 2, 3];

function TaskBoard() {
  const style = {
    bar: {
      display: "flex",
      gap: "20px",
      justifyContent: "space-between",
    },
  };
  return (
    <>
      <div>
        <BreadCrumbs
          first="app"
          second="dashboard"
          third="Admin Dashboard"
          four="Taskboard"
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop:"40px" }}>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box>
                <Typography>Lead</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                {arr.map((index) => (
                  <Avatar src={user} key={index} />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography>Team</Typography>

              <Box sx={{ display: "flex" }}>
                {arr.map((index) => (
                  <Avatar src={user} key={index} />
                ))}
              </Box>
            </Box>
          </Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              gap: "20px",
              cursor: "pointer",
            }}
          >
            <Box sx={{ width: "50px" }}>
              <Box
                sx={{
                  borderRadius: "10px",
                  border: "1px solid black",
                  textAlign: "center",
                  paddingTop: "5px",
                }}
              >
                <LinkIcon />
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  width: "10rem",
                  // borderRadius: "25px",
                  padding: "10px",
                  fontWeight: "700",
                }}
              >
                + Create List
              </Button>
            </Box>
          </div>
        </div>
        <Box sx={style.bar}>
          <Typography variant="h5" sx={{ color: "black" }}>
            {" "}
            Progress{" "}
          </Typography>
          <Typography variant="h4" sx={{ color: "#059669" }}>
            40%
          </Typography>
        </Box>
        <LinearDeterminate />
      </div>
      
     <Task/>
     
    </>
  );
}

export default TaskBoard;
