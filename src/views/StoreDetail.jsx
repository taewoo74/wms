import { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
// import ProductGraph from '../components/ProductGraph';
import SearchGraph from '../components/SearchGraph';

function StoreDetail() {
  const access_token = useSelector((state) => state.access_token.access_token);
  const [receivingData, setReceivingData] = useState({});
  const [detailData, setdetailData] = useState({});

  const getExpecData = () => {

    axios.get('http://wms-24.dknote.net:13301/api/receivings/3/expect', {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    })
      .then(function (response) {

        // console.log(response.data);
        console.log(response);

        let data = response.data;
        data['receivingMemos'] ? data['receivingMemos'] = data['receivingMemos'].length : data['receivingMemos'] = 0;
        data['vendorNames'] ? data['vendorNames'] = data['vendorNames'][0] : data['vendorNames'] = '-'
        data['createdAt2'] = data['createdAt'].substr(0, 10);
        data['createdAt'] = data['creatorName'] + ' / ' + data['createdAt2'];
        data['scheduledDate'] = data['scheduledDate'].substr(0, 10);

        setReceivingData(response.data);


        let result = data['receivingProductSets'];

        for (let i = 0; i < result.length; i++) {
          let one = result[i];
          one['no'] = i + 1;
          one['scheduledDate'] = data['scheduledDate'] && data['scheduledDate'].substr(0, 10);
          one['createdAt'] = data['createdAt2'];
          one['memos'] = one['memos'] ? one['memos'].length : 0
          one['total'] = one['expectedQuantity'];

          if (one['doneDate'] == null) {
            one['doneDate'] = '-'
          }

          if (one['status'] == 'CONFIRM_EXPECT') {
            one['status'] = '입고완료'
          }

          if (one['status'] == 'PART_RECEIVING') {
            one['status'] = '일부입고'
          }

          if (one['status'] == 'PART_ARRIVAL') {
            one['status'] = '일부처리'
          }

          if (one['status'] == 'ARRIVAL') {
            one['status'] = '처리완료'
          }

        }

        setdetailData(result);
      })
      .catch(function (error) {

        console.log(error);
      })
  }


  const getProductData = () => {
    const data = {
      'direction': 'ASC',
      'page': 1,
      // 'productSetId': ['3'],
      'size': 50,
      // 'sortColumns': [],
      // 'status': 'ARRIVAL_QUANTITY',
    }

    axios.get('http://wms-24.dknote.net:13301/api/receiving-product', {
      params: data,
      headers: {
        authorization: `Bearer ${access_token}`,
      }
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {

        console.log(error);
      })
      .then(function () {

      });

  }

  useEffect(() => {
    getExpecData();
    // getProductData();
  }, []);



  return (
    <div className='storeDetail' >
      <div className='store_title' > 입고등록 상세페이지 </div>

      <div className='main_view' >
        <div className='store_expected_box'>
          <div className='store_expected_box_top' > 입고예정 정보 </div>
          <div className='store_expected_box_line' >
            <div className='box_line' >
              <div className='box_line_left'>입고예정 코드</div>
              <div className='box_line_right'> {receivingData['receivingCode']} </div>
            </div>

            <div className='box_line' >
              <div className='box_line_left'>입고 구분</div>
              <div className='box_line_right'>  {receivingData['type']} </div>
              {/* "CONFIRM_EXPECT" 입고 확인 */}
            </div>

            <div className='box_line' >
              <div className='box_line_left'>진행상태</div>
              <div className='box_line_right'>{receivingData['status']} </div>
            </div>

            <div className='box_line' >
              <div className='box_line_left'>입고예정코드 메모</div>
              <div className='box_line_right'>{receivingData['receivingMemos']}</div>
            </div>
          </div>

          <div className='store_expected_box_line' >
            <div className='box_line' >
              <div className='box_line_left'>거래처</div>
              <div className='box_line_right'>{receivingData['vendorNames']}</div>
            </div>

            <div className='box_line' >
              <div className='box_line_left'>입고예정일</div>
              <div className='box_line_right'>{receivingData['scheduledDate']}</div>
            </div>

            <div className='box_line' >
              <div className='box_line_left'>등록자/일자</div>
              <div className='box_line_right'>{receivingData['createdAt']}</div>
            </div>

            <div className='box_line' >
              <div className='box_line_left'>최종완료 일자</div>
              <div className='box_line_right'> - </div>
            </div>
          </div>
        </div>

        <div className='product_box' >
          <div className='store_expected_box_top' > 입고예정 정보 </div>
          <SearchGraph data={detailData} columnsState={2} getProductData={getProductData} />

        </div>

      </div>

    </div>
  )
}

export default StoreDetail
