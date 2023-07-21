import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//       backgroundColor: '#c9cdd2',
//       color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//       fontSize: 12,
//   },
// }));

const columns1 = [
  { field: 'no', headerName: '번호', width: 53, headerClassName: 'graph-header' },
  { field: 'receivingCode', headerName: '입고예정 코드', width: 119, headerClassName: 'graph-header' },
  { field: 'scheduledDate', headerName: '입고예정 일', width: 112, headerClassName: 'graph-header' },
  { field: 'vendorName', headerName: '매입처', width: 83, headerClassName: 'graph-header' },
  { field: 'expectedQuantity', headerName: '입고구분', sortable: false, width: 87, headerClassName: 'graph-header' },
  { field: 'status', headerName: '진행상태', sortable: false, width: 87, headerClassName: 'graph-header' },
  { field: 'productName', headerName: '출고상품 명', sortable: false, width: 174, headerClassName: 'graph-header' },
  { field: 'productQuantity', headerName: '전체', sortable: false, width: 74, headerClassName: 'graph-header' },
  { field: 'notYetArrivalQuantity', headerName: '미입하', sortable: false, width: 80, headerClassName: 'graph-header' },
  { field: 'cancelQuantity', headerName: '예정취소', sortable: false, width: 78, headerClassName: 'graph-header' },
  // { field: 'fullName7', headerName: '회송/양품', sortable: false, width: 160, },nonDefectiveQuantity /resendingQuantity
  { field: 'arrivalQuantity', headerName: '입하', sortable: false, width: 79, headerClassName: 'graph-header' },
  { field: 'creatorName', headerName: '등록자', sortable: false, width: 74, headerClassName: 'graph-header' },
  { field: 'createdAt', headerName: '등록일', sortable: false, width: 144, headerClassName: 'graph-header' },
  { field: 'doneDate', headerName: '최종완료일', sortable: false, width: 144, headerClassName: 'graph-header' },
  { field: 'memos', headerName: '입고예정메모', sortable: false, width: 143, headerClassName: 'graph-header' },
];


const columns2 = [
  { field: 'no', headerName: '번호', width: 52, headerClassName: 'graph-header' },
  { field: 'defaultProductCode', headerName: '출고상품 코드', width: 242 , headerClassName: 'graph-header'},
  { field: 'defaultProductName', headerName: '출고상품 명', width: 243, headerClassName: 'graph-header'},
  { field: 'total', headerName: '총 수량(EA)', width: 199,headerClassName: 'graph-header' },
  // { field: 'expectedQuantity', headerName: '입고구분', sortable: false, width: 199, headerClassName: 'graph-header'},
  { field: 'expectedQuantity', headerName: '예정수량', sortable: false, width: 99,headerClassName: 'graph-header' },
  { field: 'notYetArrivalQuantity', headerName: '미입하', sortable: false, width: 100, headerClassName: 'graph-header'},
  { field: 'arrivalQuantity', headerName: '입하', sortable: false, width: 97,headerClassName: 'graph-header' },
  { field: 'quantity', headerName: '입고', sortable: false, width: 103,headerClassName: 'graph-header' },
  { field: 'quantityrate', headerName: '입고완료율', sortable: false, width: 102,headerClassName: 'graph-header' },
  // { field: 'fullName7', headerName: '회송/양품', sortable: false, width: 160, },nonDefectiveQuantity /resendingQuantity
  { field: 'cancelQuantity', headerName: '예정 취소', sortable: false, width: 98,headerClassName: 'graph-header' },
  { field: 'resendingQuantity', headerName: '회송', sortable: false, width: 99,headerClassName: 'graph-header' },
  { field: 'nonDefectiveQuantity', headerName: '양품요청', sortable: false, width: 98,headerClassName: 'graph-header' },
  { field: 'doneDate', headerName: '입고완료일', sortable: false, width: 138,headerClassName: 'graph-header' },
  // { field: 'memos', headerName: '입고예정메모', sortable: false, width: 125, },
];


export default function DataTable(props) {
  const { data, columnsState } = props

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={
          (columnsState == 1 && columns1) ||
          (columnsState == 2 && columns2)
        }
      />
    </div>
  );
}