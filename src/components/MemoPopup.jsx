import { useState } from 'react'

function MemoPopup() {

  return (
    <div className='memoPopup'>
      <div className='dim' ></div>
      <div className='memoPopup_layer'>

        <div className="main">
          <div className='memo_top' >
            <div className="memo_header">메모</div>

            <div className="memo_box">
              <div className="memo_title">메모 입력 안내</div>
              <div className="memo_line">
                -한번 등록된 메모 수정이나 삭제가 불가능합니다.
              </div>
            </div>

            <textarea
              type="text"
              className="memo_input"
              maxlength="500"
              placeholder="내용을 입력해 주세요, 최소 1자~500자"
            />
          </div>
          <div className='memo_bottom' >
            개의 메모
          </div>

        </div>

      </div>
    </div>
  )
}

export default MemoPopup
