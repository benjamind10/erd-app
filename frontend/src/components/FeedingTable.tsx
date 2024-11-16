import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import dayjs from 'dayjs';

interface Feeding {
    id: string;
    feedingTime: string;
    amount: number;
    dha: boolean;
}

interface FeedingTableProps {
    feedings: Feeding[];
}

const FeedingTable: React.FC<FeedingTableProps> = ({ feedings }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Feeding Time</TableCell>
                        <TableCell align="center">Amount (oz)</TableCell>
                        <TableCell align="center">DHA Included</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feedings.map((feeding) => (
                        <TableRow key={feeding.id}>
                            <TableCell align="center">
                                {dayjs(parseInt(feeding.feedingTime))
                                    .utc()
                                    .local()
                                    .format('YYYY-MM-DD hh:mm A')}
                            </TableCell>
                            <TableCell align="center">{feeding.amount}</TableCell>
                            <TableCell align="center">{feeding.dha ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FeedingTable;
