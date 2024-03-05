import { Avatar, Box, Paper, Typography } from "@mui/material";
import UserImage from "@/assets/images/client.jpg";
import Option from "@/components/option-menu";
import LinearDeterminate from "@/pages/dashboard/admin-dashboard/component/progess-bar";

// import style from "../style"
const Card = (props: any) => {
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
  const arr = [1, 2, 3, 4];
  return (
    <Paper sx={style.card}>
      <Box sx={style.gap}>
        <Box sx={style.header}>
          <Typography variant="h4">{props.text}</Typography>
          <Option />
        </Box>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ "& strong": { color: "black" } }}
        >
          <strong>1</strong> open tasks, <strong>9</strong> tasks completed
        </Typography>
      </Box>
      <Typography sx={style.text}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. When an unknown printer took a galley of type and scrambled
        it...
      </Typography>
      <Box sx={style.gap}>
        <Typography variant="h5" sx={{ color: "black" }}>
          {" "}
          Deadline:{" "}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
          17 Apr 2019
        </Typography>
      </Box>
      <Box sx={style.gap}>
        <Typography variant="h5" sx={{ color: "black" }}>
          {" "}
          Project Leader :{" "}
        </Typography>
        <Typography variant="h5">
          <Avatar src={UserImage} />
        </Typography>
      </Box>
      <Box sx={style.gap}>
        <Typography variant="h5" sx={{ color: "black" }}>
          {" "}
          Team :{" "}
        </Typography>
        <Typography variant="h4">
          {arr.map((index: number) => (
            <Avatar src={UserImage} key={index} />
          ))}
        </Typography>
      </Box>
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
    </Paper>
  );
};

export default Card;
