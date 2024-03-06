import { Box, Typography } from "@mui/material";
import Card from "./component/card";
import AddProject from "./component/modal";
import BreadCrumbs from "@/components/BreadCrumbs";
const Projects = () => {
  // const arr = [1, 2,3,4,5,6,7,8,9 ]

  const data = [
    { index: 1, text: "Office Management" },
    { index: 2, text: "Project Management" },
    { index: 3, text: "App Development" },
    { index: 4, text: "Web Development" },
    { index: 5, text: "Web Development" },
    { index: 6, text: "Web Development" },
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
      <Typography variant="h4">Projects</Typography>
      <BreadCrumbs first="app" second="dashboard" third="Admin Dashboard" />
      <Box sx={style.box}>
        <AddProject />
      </Box>
      <Box sx={style.card}>
        {data.map(({ index, text }) => (
          <Card key={index} text={text} />
        ))}
      </Box>
    </>
  );
};
export default Projects;
