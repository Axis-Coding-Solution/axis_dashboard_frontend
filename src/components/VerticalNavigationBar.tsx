import { Link } from "react-router-dom";
import { NavigationData } from "@/navigation";
import MuiIcons from "@/components/mui-icons";
import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from "@mui/material";

const VerticalNavigationBar = (props: any) => {
    const { open, toggle, setToggle } = props
    const handleToggle = (index: number) => {
        setToggle((prevToggle: number) => prevToggle === index ? -1 : index);
    };
    return (
        <Paper sx={{
            width: open ? "50px" : "270px",
            transition: "width 0.5s",
            // position: "absolute",
            // left: 0,
            height: "100%",
            bgcolor: "white",

        }} >
            <Box paddingY={3}>
                {NavigationData.map((item, index) => (
                    // <Accordion sx={{ boxShadow: "none", borderBottom: "",  }} >
                    //     <AccordionSummary
                    //         expandIcon={<MuiIcons.KeyboardArrowDownIcon />}
                    //         aria-controls="panel2-content"
                    //         id="panel2-header"
                    //     >
                    //         <Typography color={"gray"} key={index} sx={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: "500", paddingX: item.icon ? "8px" : 0, paddingY: "5px" }}  >
                    //             {item.icon}
                    //             {item.name}
                    //         </Typography>
                    //     </AccordionSummary>
                    //     <AccordionDetails>
                    //         {item.children && item.children.map((item: any, index: number) => (
                    //             <Link to={item.path} key={index} style={{ textDecoration: "none" }}>
                    //                 <Typography key={index} color={"gray"} paddingY={1} paddingX={2}>
                    //                     {item.name}
                    //                 </Typography>
                    //             </Link>
                    //         ))}
                    //     </AccordionDetails>
                    // </Accordion>

                    <Box key={index}  sx={{transition: " height 0.9s",}} onClick={() => handleToggle(index)}>
                        <Typography key={index} color={"gray"}

                            sx={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                fontSize: "13px",
                                fontWeight: "500",
                                paddingX: item.icon ? "8px" : 0,
                                paddingY: "5px",
                                transition: "0.5s",
                            }}>
                            <Box sx={{ fontSize: "12px" }} >
                                {item.icon}
                            </Box>
                            <Box sx={{
                                display: open ? "none" : "block",
                                color: item.icon ? "gray" : "#059669",
                                width: "80%",
                                // backgroundColor: "red",
                            }} >
                                {item.name}
                            </Box>
                            {item.icon &&
                                <Box>
                                    {toggle === index ?
                                        <MuiIcons.KeyboardArrowDownIcon sx={{
                                            display: open ? "none" : "block",
                                            transition: "0.5s",
                                            // color: "#059669",
                                            // fontSize:"20px"
                                        }}
                                        />
                                        :
                                        <MuiIcons.ChevronRightTwoToneIcon sx={{
                                            display: open ? "none" : "block",
                                        }}
                                        />
                                    }
                                </Box>
                            }
                        </Typography>
                        {toggle === index &&
                            <Box key={index} sx={{
                                marginLeft: "40px",
                                transition: "0.5s",
                            }}>
                                {item.children && item.children.map((item, index) => (
                                    <Link to={item.path} style={{ textDecoration: "none" }}>
                                        <Typography key={index} color={"gray"} paddingY={1} fontSize={14} >
                                            {item.name}
                                        </Typography>
                                    </Link>
                                ))}
                            </Box>
                        }

                    </Box>
                ))}
            </Box>
        </Paper>
    )
}

export default VerticalNavigationBar

