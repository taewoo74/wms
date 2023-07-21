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

const aa = () => {

}

const columns1 = [
  { field: 'no', headerName: '번호', width: 53, headerClassName: 'graph-header' ,sortable: true},
  { field: 'receivingCode', headerName: '입고예정 코드', width: 119, headerClassName: 'graph-header', sortable: true,  },
  { field: 'scheduledDate', headerName: '입고예정 일', width: 112, headerClassName: 'graph-header', sortable: true,  },
  { field: 'vendorName', headerName: '매입처', width: 83, headerClassName: 'graph-header', sortable: true,  },
  { field: 'expectedQuantity', headerName: '입고구분',  width: 87, headerClassName: 'graph-header' , sortable: true, },
  { field: 'status', headerName: '진행상태',  width: 87, headerClassName: 'graph-header', sortable: true,  },
  { field: 'productName', headerName: '출고상품 명',  width: 174, headerClassName: 'graph-header', sortable: true },
  { field: 'productQuantity', headerName: '전체',  width: 74, headerClassName: 'graph-header', sortable: true },
  { field: 'notYetArrivalQuantity', headerName: '미입하',  width: 80, headerClassName: 'graph-header', sortable: true },
  { field: 'cancelQuantity', headerName: '예정취소', width: 78, headerClassName: 'graph-header' , sortable: true},
  // { field: 'fullName7', headerName: '회송/양품', sortable: true, width: 160, },nonDefectiveQuantity /resendingQuantity
  { field: 'arrivalQuantity', headerName: '입하',  width: 79, headerClassName: 'graph-header', sortable: true },
  { field: 'creatorName', headerName: '등록자',  width: 74, headerClassName: 'graph-header', sortable: true },
  { field: 'createdAt', headerName: '등록일',  width: 144, headerClassName: 'graph-header', sortable: true },
  { field: 'doneDate', headerName: '최종완료일',  width: 144, headerClassName: 'graph-header', sortable: true },
  { field: 'memos', headerName: '입고예정메모',  width: 143, headerClassName: 'graph-header', sortable: true },
];


const columns2 = [
  { field: 'no', headerName: '번호', width: 52, headerClassName: 'graph-header', sortable: true },
  { field: 'defaultProductCode', headerName: '출고상품 코드', width: 242 , headerClassName: 'graph-header', sortable: true},
  { field: 'defaultProductName', headerName: '출고상품 명', width: 243, headerClassName: 'graph-header', sortable: true},
  { field: 'total', headerName: '총 수량(EA)', width: 199,headerClassName: 'graph-header', sortable: true },
  // { field: 'expectedQuantity', headerName: '입고구분', sortable: true, width: 199, headerClassName: 'graph-header'},
  { field: 'expectedQuantity', headerName: '예정수량', width: 99,headerClassName: 'graph-header', sortable: true},
  { field: 'notYetArrivalQuantity', headerName: '미입하', sortable: true, width: 100, headerClassName: 'graph-header'},
  { field: 'arrivalQuantity', headerName: '입하',  width: 97,headerClassName: 'graph-header', sortable: true },
  { field: 'quantity', headerName: '입고',  width: 103,headerClassName: 'graph-header', sortable: true },
  { field: 'quantityrate', headerName: '입고완료율', width: 102,headerClassName: 'graph-header', sortable: true },
  // { field: 'fullName7', headerName: '회송/양품', sortable: true, width: 160, },nonDefectiveQuantity /resendingQuantity
  { field: 'cancelQuantity', headerName: '예정 취소',  width: 98,headerClassName: 'graph-header', sortable: true },
  { field: 'resendingQuantity', headerName: '회송', width: 99,headerClassName: 'graph-header', sortable: true },
  { field: 'nonDefectiveQuantity', headerName: '양품요청', width: 98,headerClassName: 'graph-header', sortable: true },
  { field: 'doneDate', headerName: '입고완료일',  width: 138,headerClassName: 'graph-header', sortable: true },
  // { field: 'memos', headerName: '입고예정메모', sortable: true, width: 125, },
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