import { Paper, Stack, Typography } from '@mui/material'
import AdminDashboardTable from './component/admin-dashboard-table'

const InvoicePayments = () => {
  return (
    <Paper sx={{ padding: "0px" }} >
        <Typography variant='h4' >Invoice Payments</Typography>
        <Stack gap={3} >
        <AdminDashboardTable />
        <AdminDashboardTable />
        </Stack>
    </Paper>
  )
}

export default InvoicePayments
