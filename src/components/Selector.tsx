// import { Box, FormControl, InputLabel, MenuItem } from "@mui/material"
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { useState } from "react";
// const Selector = ( props : any ) => {
//     const {title} = props
//     const [age, setAge] = useState('');
//     const handleChange = (event: SelectChangeEvent) => {
//         setAge(event.target.value as string);
//     };
//     return (
//         <Box sx={{ width: "100%" }} >
//             <FormControl  sx={{ width: "100%" }} >
//                 <InputLabel id="demo-simple-select-label"> {title} </InputLabel>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={age}
//                     label="Age"
//                     onChange={handleChange}
//                     sx={{ width: "100%" }}
//                 >
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//             </FormControl>
//         </Box>
//     )
// }

// export default Selector

import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

const Selector = (props: any) => {
  const { title } = props;
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{ width: "100%", border: "1px solid #ccc" }}
          MenuProps={{
            PaperProps: {
                style: {
                    width: "100px",
                    border: "1px solid #ccc", 
                }
            }
        }} 
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Selector;
