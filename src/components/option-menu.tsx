import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

// const menuItemStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "8px",
//   // border: "1px solid #ccc",
//   padding: "5px",
// };
const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",

  // border: "1px solid #ccc",

  // marginBottom: "4px",
};
export default function Option() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "gray" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            border: "1px solid #ccc",
            borderRadius:"8px",
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "100px",
            padding: "15px",
            // height: "100px",
          },
        }}
      >
        {/* <MenuItem onClick={handleClose} sx={menuItemStyle}>
          <EditIcon fontSize="small" />
          <span>Edit</span>
        </MenuItem> */}
        <MenuItem
          onClick={handleClose}
          sx={{ ...menuItemStyle, borderBottom: "1px solid black" }}
        >
          <EditIcon fontSize="small" />
          <span>Edit</span>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={menuItemStyle}>
          <DeleteIcon fontSize="small" />
          <span>Delete</span>
        </MenuItem>
      </Menu>
    </div>
  );
}

// import * as React from "react";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// const ITEM_HEIGHT = 48;

// const menuItemStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "8px",

// };

// export default function Option() {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? "long-menu" : undefined}
//         aria-expanded={open ? "true" : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//         sx={{ color: "gray" }}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           "aria-labelledby": "long-button",
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           style: {
//             border: "1px solid #ccc",
//             maxHeight: ITEM_HEIGHT * 4.5,

//             width: "120px",
//             height:"100px"
//           },
//         }}
//       >
//         <MenuItem onClick={handleClose} sx={menuItemStyle}>
//           <EditIcon fontSize="small" />
//           <span>Edit</span>
//         </MenuItem>
//         <MenuItem onClick={handleClose} sx={menuItemStyle}>
//           <DeleteIcon fontSize="small" />
//           <span>Delete</span>
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// }
