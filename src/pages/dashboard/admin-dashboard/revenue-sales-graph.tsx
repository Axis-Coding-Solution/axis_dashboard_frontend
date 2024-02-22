import { Box } from '@mui/material'
import { LineChart } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';

const RevenueSalesGraph = () => {

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }} >
      <Box sx={{ padding: "20px", backgroundColor: "#fff", borderRadius: "10px", }} >
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
          width={500}
          height={300}
        />
      </Box>
      <Box sx={{ padding: "20px", backgroundColor: "#fff", borderRadius: "10px", }} >
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />
      </Box>



    </Box>

  )
}

export default RevenueSalesGraph
