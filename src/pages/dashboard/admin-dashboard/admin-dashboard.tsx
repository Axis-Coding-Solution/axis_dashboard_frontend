// import { dashboard } from "@/navigation/dashboard"
import { Box, Typography } from "@mui/material"
import AnalyticCard from "./component/analytic-card"
import MuiIcons from '@/components/mui-icons'
import RevenueSalesGraph from "./revenue-sales-graph"
import InfoCard from "./component/info-card"
import BreadCrumbs from "@/components/BreadCrumbs"
import Statistics from "./statictis-section/Statistics"
import TaskStatistics from "./statictis-section/TaskStatistics"
import TodayAbsent from "./statictis-section/today-absent"
import InvoicePayments from "./Invoice-payments"

const AdminDashboard = () => {
  const AnalyticCardData = [
    {
      icon: <MuiIcons.RocketOutlinedIcon />
      ,
      quantity: "100",
      name: "Projects",
    },
    {
      icon: <MuiIcons.MonetizationOnOutlinedIcon />,
      quantity: "50",
      name: "Client",
    },
    {
      icon: <MuiIcons.DiamondOutlinedIcon />,
      quantity: "29",
      name: "Tasks",
    },
    {
      icon: <MuiIcons.PermIdentityOutlinedIcon />,
      quantity: "39",
      name: "Employees",
    }
  ]
  const infoCardData = [
    {
      title: "New Employees",
      percentage: "+10%",
      value: "10",
      description: "Overall Employees 218"
    },
    {
      title: "Earnings",
      percentage: "+12.5%",
      value: "$1,42,300",
      description: "Previous Month $1,15,852"
    },
    {
      title: "Expenses",
      percentage: "-2.8%",
      value: "$8,500",
      description: "Previous Month $7,500"
    },
    {
      title: "Profit",
      percentage: "-75%",
      value: "$1,12,000",
      description: "Previous Month $1,42,000"
    }
  ]
  return (
    <Box sx={{ paddingX: "20px", display: "flex", flexDirection: "column", gap: "20px", }} >
      <Box>
        <Box sx={{ paddingY: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <BreadCrumbs first="app" second="dashboard" third="Admin Dashboard" />
          <Typography style={{ fontWeight: "bold", fontSize: "20px" }} >Welcome Admin ! </Typography>
        </Box>
        <AnalyticCard AnalyticCardData={AnalyticCardData} />
      </Box>
      <RevenueSalesGraph />
      <InfoCard AnalyticCardData={infoCardData} />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "20px" }} >
        <Statistics />
        <TaskStatistics />
        <TodayAbsent />
      </Box>
      <InvoicePayments />
    </Box>
  )
}

export default AdminDashboard
