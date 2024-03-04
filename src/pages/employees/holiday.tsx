import { Box, Button } from '@mui/material'
import React from 'react'
import HolidayTable from './component/holiday-table'

const Holiday = () => {
    const style = {
        button: {
            textAlign: "end"
        },
        btn: {
            width: "15%"
        }
    }
    return (
        <>
            <Box sx={style.button}>
                <Button variant="contained" sx={style.btn} >
                    Add Holiday
                </Button>
            </Box>
            <HolidayTable />
        </>
    )
}

export default Holiday
