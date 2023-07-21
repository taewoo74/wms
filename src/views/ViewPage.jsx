import { useState ,useEffect } from 'react'
import StoreDetail from './StoreDetail'
import StoreInquiry from './StoreInquiry';
import MemoPopup from '../components/MemoPopup'

function ViewPage(props) {
  const [state, setState] = useState('');
  const [memoState , setMemoState] = useState(false);


  return (
    <div className='viewPage' >
      <div className='header' >
        <div className='tab_Button' onClick={() => setState('check')} >조회</div>
        <div className='tab_Button' onClick={() => setState('detail')} >상세</div>
      </div>

      {state == 'check' && (
        <StoreInquiry  />
      )}

      {state == 'detail' && (
        <StoreDetail  />
      )}

      {memoState && ( 
        <MemoPopup />
      )}
      

    </div>
  )
}

export default ViewPage
