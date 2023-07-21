import { useState } from 'react'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#c9cdd2',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    {
        width: 40,
        label: '번호',
        dataKey: 'dessert',
    },
    {
        width: 242,
        label: '출고상품 코드',
        dataKey: 'calories',
        numeric: true,
    },
    {
        width: 243,
        label: '출고상품 명',
        dataKey: 'fat',
        numeric: true,
    },
    {
        width: 199,
        label: '총수량',
        dataKey: 'carbs',
        numeric: true,
    },
    {
        width: 99,
        label: '예정수량',
        dataKey: 'protein',
        numeric: true,
    },
];


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
];

function ProductGraph() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.dataKey}
                            variant="head"
                            align={column.numeric || false ? 'right' : 'left'}
                            style={{ width: column.width }}
                            sx={{
                                backgroundColor: 'background.paper',
                            }}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductGraph
