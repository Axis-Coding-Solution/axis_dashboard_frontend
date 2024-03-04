import { Box, Paper, Stack, Typography } from '@mui/material'
import LinearDeterminate from '../component/progess-bar';
import {style} from "../style";
const Statistics = () => {
 
  let data = [
    { name: "Today Leave", current: 4, total: 65 },
    { name: "Pending Invoice", current: 15, total: 92 },
    { name: "Completed Projects", current: 86, total: 112 },
    { name: "Open Tickets", current: 190, total: 212 },
    { name: "Closed Tickets", current: 22, total: 212 }
  ];
  return (
    <Paper  >
      <Typography variant='h4' > Statistics </Typography>
      <Box sx={{ padding: "20px" }} >
        {data.map((item: any, index: number) => (
          <Box key={index} sx={style.statsCard} >
            <Stack direction="row" justifyContent="space-between" gap={2} >
              <Typography> {item.name} </Typography>
              <Typography variant='h5' sx={ style.progress }>
                <Typography variant='h4' >
                  {item.current}
                </Typography>
                <Typography variant='h4' > / </Typography>
                <Typography variant='h5' >
                  {item.total}
                </Typography>
              </Typography>
            </Stack>
            <LinearDeterminate />
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

export default Statistics
