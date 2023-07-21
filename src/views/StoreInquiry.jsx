import { useState, useEffect } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchGraph from '../components/SearchGraph';
import SelectBox from '../components/SelectBox';
import SelectBox2 from '../components/SelectBox2';
import { useSelector } from "react-redux";

function StoreInquiry() {
  const access_token = useSelector((state) => state.access_token.access_token);
  const [summaryData, setSummaryData] = useState({ totalList: [], expectedReceivingIdList: [], cancelReceivingIdList: [], inProgressReceivingIdList: [], doneReceivingIdList: [], delayReceivingIdList: [] });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchText2, setSearchText2] = useState('');
  const [graphData, setGraphData] = useState({});
  const [state, setState] = useState('');
  const [summary, setSummary] = useState('');
  const [pageInfo, setPageINfo] = useState({});

  const [select, setSelect] = useState(0);
  const [select2, setSelect2] = useState(0);
  const [select3, setSelect3] = useState(0);
  const [select4, setSelect4] = useState(0);
  const [select5, setSelect5] = useState(0);

  const [checkValue, setCheckValue] = useState([false, false, false, false, false, false, false, false, false]);
  const [checkValue2, setCheckValue2] = useState([false, false, false]);

  const selectBoxOption = [['등록일자', 'CREATE_DATE'], ['입고예정일', 'SCHEDULE_DATE'], ['최종완료일', 'DONE_DATE']]
  const selectBoxOption2 = [['입고예정 코드', 'PRODUCT_CODE'], ['출고상품명', 'PRODUCT_ITEM_NAME'], ['출고상품코드', 'PRODUCT_CODE'], ['시리얼번호', 'SERIAL_NUMBER'], ['등록자', 'CREATOR'], ['메모내용', 'TEXT_OF_MEMO']]
  const selectBoxOption3 = [['전체'], ['입고예정'], ['부분입하'], ['입하완료'], ['부분입고'], ['입고완료'], ['입고예정취소'], ['회송'], ['양품']]
  const selectBoxOption4 = [['설로인'], ['소잡는 녀석들'], ['디카르고']]
  const selectBoxOption5 = [['전체'], ['정상입고'], ['양품입고']]

  const pageNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];



  const onClickValue = (e,state) => {
    e.stopPropagation();
    let value = e.target.checked;
    let index = e.target.attributes.index.value;

    let result = [];
    let arr = [];

    if (state == 1 ) {
      arr = checkValue;
    } else {
      arr = checkValue2;
    }

    if (index == 0) {
      for (let i = 0; i < arr.length; i++) {
        result.push(value);
      }
    } else {
      for (let i=0; i<arr.length; i++ ) {
         
        if (index == i) {
          result.push(value);
        }
        result.push(arr[i]);
      }    
    }
    if (state == 1) {
      setCheckValue(result);
      return;
    }
    setCheckValue2(result);

  }


  function dateFormat(date) {
    let dateFormat2 = date.getFullYear() +
      '-' + ((date.getMonth() + 1) < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
      '-' + ((date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()));
    return dateFormat2;
  }

  function arraryFormat(data) {
    if (!data) {
      return '';
    }

    let result = '';

    for (let i = 0; i < data.length; i++) {
      if (i != 0) {
        result += ',';
      }
      result += data[i];
    }
    console.log(result);
    return result;
  }


  async function getSummary() {

    await axios.get('http://wms-24.dknote.net:13301/api/receivings/summary', {
      headers: {
        authorization: `Bearer ${access_token}`,
      }
    })
      .then(function (response) {
        let data = response.data;

        data['totalList'] = [];

        data['totalList'] = [...data['expectedReceivingIdList'],
        ...data['inProgressReceivingIdList']];
        setSummaryData(data);
      })
      .catch(function (error) {
        console.log(error);
      })


  }

  async function receivingsExpect(data) {

    await axios.get('http://wms-24.dknote.net:13301/api/receivings/expect', {
      params: data,
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    })
      .then(function (response) {
        let pageInfo = response.data.pagingInfo;
        setPageINfo(pageInfo);
        let result = response.data.data;
        for (let i = 0; i < result.length; i++) {
          let one = result[i];
          one['no'] = i + 1;
          one['scheduledDate'] = one['scheduledDate'].substr(0, 10);
          one['createdAt'] = one['createdAt'].substr(0, 10);
          one['memos'] = one['memos'] ? one['memos'].length : 0

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

        setGraphData(result);
      })
      .catch(function (error) {

        console.log(error);
      })


  }

  function onClickSubmitButton() {
    let data = {
      'chooseIds': false,
      'direction': 'ASC',
      'endDate': dateFormat(endDate),
      'page': page,
      'searchText': '',
      'searchDateType': selectBoxOption[select][1],
      'searchTextType': selectBoxOption2[select2][1],
      'size': 50,
      'sortColumns': [],
      'startDate': dateFormat(startDate),
      'statusList': 1,
      // 'statusList': '',
      // 'typeList': [selectBoxOption5[select5][0]],
      'typeList': '',
      // 'vendorName': selectBoxOption4[select4][0]
      'vendorName': '',
    }

    setState('submit');
    receivingsExpect(data);

  }

  function onClickSummary(text) {
    let data = {
      'chooseIds': true,
      'direction': 'ASC',
      'endDate': '',
      'page': 1,
      'searchText': '',
      'searchIds': arraryFormat(summaryData[summary]),
      'searchDateType': '',
      'searchTextType': '',
      'size': 50,
      'sortColumns': [],
      'startDate': '',
      'statusList': '',
      'typeList': '',
      'vendorName': ''
    }

    setState('summary');
    setSummary(text);
    receivingsExpect(data);
  }

  const onClickPageButton = (pagenum) => {


    if (state == 'summary') {
      let data = {
        'chooseIds': true,
        'direction': 'ASC',
        'endDate': '',
        'page': pagenum + 1,
        'searchText': '',
        'searchIds': summaryData[summary],
        'searchDateType': '',
        'searchTextType': '',
        'size': 50,
        'sortColumns': [''],
        'startDate': '',
        'statusList': '',
        'typeList': '',
        'vendorName': ''
      }
      receivingsExpect(data);
    }

    if (state == 'submit') {
      let data = {
        'chooseIds': true,
        'direction': 'ASC',
        'endDate': endDate,
        'page': pagenum + 1,
        'searchText': '',
        'searchDateType': selectBoxOption[select][1],
        'searchTextType': selectBoxOption2[select2][1],
        'size': 50,
        'sortColumns': [''],
        'startDate': startDate,
        'statusList': selectBoxOption3[select3][0],
        'typeList': [selectBoxOption5[select5][0]],
        'vendorName': selectBoxOption4[select4][0]
      }
      receivingsExpect(data);
    }
  }



  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div className='storeInquiry' >
      <div className='main_view' >

        <div className='summary_box' >
          <div className='summary_container' onClick={() => onClickSummary('totalList')} >
            <div className='summary_img_box' >
            </div>
            <div className='summary_text_box'  >
              <div className='summary_text_top' >전체</div>
              <div className='summary_text_bottom'>
                <span className='summary_text_h' >{summaryData['totalList'].length}</span>건</div>
            </div>
          </div>

          <div className='summary_container' onClick={() => onClickSummary('expectedReceivingIdList')} >
            <div className='summary_img_box' >
            </div>
            <div className='summary_text_box'  >
              <div className='summary_text_top' >입고예정</div>
              <div className='summary_text_bottom'>
                <span className='summary_text_h' >
                  {summaryData['expectedReceivingIdList'].length}
                </span>건</div>
            </div>
          </div>

          <div className='summary_container' onClick={() => onClickSummary('cancelReceivingIdList')} >
            <div className='summary_img_box' >
            </div>
            <div className='summary_text_box'   >
              <div className='summary_text_top' >당일 입고예정 취소</div>
              <div className='summary_text_bottom'>
                <span className='summary_text_h' >
                  {summaryData['cancelReceivingIdList'].length}
                </span>건</div>
            </div>
          </div>

          <div className='summary_container' onClick={() => onClickSummary('inProgressReceivingIdList')}>
            <div className='summary_img_box' >
            </div>
            <div className='summary_text_box'  >
              <div className='summary_text_top' >입고 진행중</div>
              <div className='summary_text_bottom'>
                <span className='summary_text_h' >
                  {summaryData['inProgressReceivingIdList'].length}
                </span>건</div>
            </div>
          </div>

          <div className='summary_container' onClick={() => onClickSummary('doneReceivingIdList')}>
            <div className='summary_img_box' >
            </div>
            <div className='summary_text_box'  >
              <div className='summary_text_top' >당일 입고완료</div>
              <div className='summary_text_bottom'>
                <span className='summary_text_h' >
                  {summaryData['doneReceivingIdList'].length}
                </span>건</div>
            </div>
          </div>

          <div className='summary_container' onClick={() => onClickSummary('delayReceivingIdList')}  >
            <div className='summary_img_box' >
            </div>
            <div className='summary_text_box'  >
              <div className='summary_text_top' >입고지연</div>
              <div className='summary_text_bottom'>
                <span className='summary_text_h' >
                  {summaryData['delayReceivingIdList'].length}
                </span>건</div>
            </div>
          </div>


        </div>

        <div className='storeInquiry_box' >

          <div className='box_c1'>
            <div style={{ fontSize: '13px' }} >조회기간</div>
            <div className='box_l2' >
              <SelectBox selectBox={selectBoxOption} select={select} setSelect={setSelect} />


              <DatePicker className='select_box' selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />

              <DatePicker className='select_box' selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="yyyy-MM-dd" />

              <div className='r_button on'> 오늘 </div>
              <div className='r_button'> 일주일 </div>
              <div className='r_button'> 1개월 </div>
              <div className='r_button'> 3개월 </div>
              <div className='r_button'> 12개월 </div>
            </div>

            <div className='box_l1'  >
              검색어
            </div>
            <div className='box_l1_s1'> 진행상태</div>
            <div className='box_l1_s1'> 거래처</div>
            <div className='box_l1_s1'> 입고구분</div>

            <div className='box_l2' >

              <SelectBox selectBox={selectBoxOption2} select={select2} setSelect={setSelect2} />
              <input className='select_box2' placeholder='검색어 입력' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <SelectBox2 selectBox={selectBoxOption3} select={select3} setSelect={setSelect3} checkValue={checkValue} onClickValue={onClickValue} state={1} />
              <input className='select_box3' placeholder='거래처 선택' value={searchText2} onChange={(e) => setSearchText2(e.target.value)} />
              <SelectBox2 selectBox={selectBoxOption5} select={select5} setSelect={setSelect5} checkValue={checkValue2} onClickValue={onClickValue} state={2} />

            </div>
          </div>

          <div className='button_box' >
            <div className='button_style1 on' onClick={onClickSubmitButton} >검색</div>
            <div className='button_style1'>초기화</div>
          </div>
        </div>

        <div className='search_text_line' >
          {pageInfo && pageInfo['totalElements']}건 검색
        </div>

        <div className='search_result_box'>
          <div>
            <SearchGraph data={graphData} columnsState={'1'} />

            <div className='page_box' >
              <div className='pageNum_box'  >
                {pageNum.map((val, index) => (
                  <div className='page_button' key={index} onClick={() => onClickPageButton(val)} >
                    {val + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreInquiry
