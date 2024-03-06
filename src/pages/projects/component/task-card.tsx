import { Box, Paper, Typography } from "@mui/material";

import Option from "@/components/option-menu";

// import style from "../style"
const TaskCard = (props: any) => {
  const style = {
    card: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      paddingX: "25px",
      width: "17rem",
    },
    gap: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "7px",
      color:"white"
    },
    text: {
      color: "gray",
    },
    bar: {
      display: "flex",
      gap: "20px",
      justifyContent: "space-between",
    },
  };
  //   const arr = [1, 2, 3, 4];
  return (
    <Paper sx={style.card}>
      <div style={{ backgroundColor: props.backgroundColor, padding: "10px" }}>
        <Box sx={style.gap}>
          <Box sx={style.header}>
            <Typography variant="h6">{props.text}</Typography>
            <Option />
          </Box>
        </Box>
      </div>
    </Paper>
  );
};

export default TaskCard;
