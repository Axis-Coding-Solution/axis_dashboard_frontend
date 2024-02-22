import { Breadcrumbs, Typography } from "@mui/material"
const BreadCrumbs = (props: any) => {
    const { first, second, third } = props
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Typography>
                {first}
            </Typography>
            <Typography>
                {second}
            </Typography>
            <Typography color="gray"> {third} </Typography>
        </Breadcrumbs>
    )
};
export default BreadCrumbs;
