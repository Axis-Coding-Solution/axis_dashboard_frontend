import { CircularProgress, Grid } from '@mui/material'
import logo from "@/assets/images/axis-logo.jpeg"
const Loader = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            // alignItems="center"
            paddingY={10}
            style={{ minHeight: '100vh' }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                gap: '20px',
            }}>
                <img src={logo} alt="logo" width={200} height={50} style={{ objectFit: "contain", }} />
                <CircularProgress color="primary" size={40} thickness={3} />
            </div>
        </Grid>
    )
}

export default Loader
