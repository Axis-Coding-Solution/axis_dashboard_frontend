import { Paper, Stack, Typography } from '@mui/material'
import InvoiceTable from './component/invoice-table'
import PaymentsTable from './component/payments-table'

const InvoicePayments = () => {
  return (
    <Paper sx={{ padding: "0px", width: "100%", bgcolor: "#f3f4f6" }} >
        <Stack gap={3} >
        <InvoiceTable />
        <PaymentsTable />
        </Stack>
    </Paper>
  )
}

export default InvoicePayments
