import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { style } from '../style';
import MuiIcons from '@/components/mui-icons';

function createData(
    id: string,
    title: string,
    holidayDate: string,
    Day: string,
) {
    return { id, title, holidayDate, Day };
}

const rows = [
    createData('1', "New Year", "1 Jan 2022", "Sunday"),
    createData('2', "Good Friday", "14 Apr 2022", "Friday"),
    createData('3', "May Day", "1 May 2022", "Monday"),
    createData('4', "Memorial Day", "28 May 2022", "Monday"),
    createData('5', "Ramzon", "26 Jun 2022", "Monday"),
    createData('6', "Bakrid", "2 Sep 2022", "Saturday"),
    createData('7', "Deepavali", "18 Oct 2022", "Wednesday"),
    createData('8', "Christmas", "25 Dec 2022", "Monday"),
];

export default function HolidayTable() {
    return (
        <Paper sx={style.tableCard} >
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" > # </TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Holiday Date</TableCell>
                            <TableCell align="center">Day</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index: number) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell align='center'> {row.id} </TableCell>
                                <TableCell align='center'> {row.title} </TableCell>
                                <TableCell align="center">{row.holidayDate}</TableCell>
                                <TableCell align="center">{row.Day}</TableCell>
                                <TableCell align="center"> <MuiIcons.MoreVertIcon /></TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>

    );
}