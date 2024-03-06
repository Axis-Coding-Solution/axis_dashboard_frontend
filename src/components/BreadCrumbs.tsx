import { Breadcrumbs, Typography } from "@mui/material"
const BreadCrumbs = (props: any) => {
    const { first, second, third,four } = props
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Typography>
                {first}
            </Typography>
            <Typography>
                {second}
            </Typography>
            <Typography color="gray"> {third} </Typography>
            <Typography color="gray"> {four} </Typography>
        </Breadcrumbs>
    )
};
export default BreadCrumbs;
