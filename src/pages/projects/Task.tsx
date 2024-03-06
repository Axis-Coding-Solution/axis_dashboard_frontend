import { Box } from "@mui/material";

import TaskCard from "./component/task-card";

const Task = () => {
  // const arr = [1, 2,3,4,5,6,7,8,9 ]
  const data = [
    { index: 1, text: "Pending", color: "red" },
    { index: 2, text: "Progress", color: "blue" },
    { index: 3, text: "Completed", color: "green" },
    { index: 4, text: "Inprogress", color: "yellow" },
    { index: 5, text: "On Hold", color: "orange" },
    { index: 6, text: "On Hold", color: "purple" },
  ];

  const style = {
    card: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      cursor: "pointer",
    },
    box: {
      textAlign: "right",
    },
  };
  return (
    <>
      <Box sx={style.card}>
        {data.map(({ index, text, color }) => (
          <TaskCard key={index} text={text} backgroundColor={color} />
        ))}
      </Box>
    </>
  );
};
export default Task;
