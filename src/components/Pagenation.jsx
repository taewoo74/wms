import { useState } from 'react'

function Pagenation(props) {
    const {data , page , onClickPageButton} = props

    let endPage = Math.ceil(data.length / 10 );

    return (
        <div className='page_box' >
            <div className='pageNum_box'  >
                {/* {pageNum.map((val, index) => (
                    <div className={'page_button' + (page == val + 1 ? " on" : "")} key={index} onClick={() => onClickPageButton(val)} >
                        {val + 1}
                    </div>
                ))} */}
            </div>
        </div>
    )
}

export default Pagenation
