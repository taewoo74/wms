import { useState ,require } from 'react'

function LeftMenu() {
   const  [ menu , setMenu ] = useState([ '현황보드' , '상품' , '입고' , '재고' , '이동' , ' 발주' , '출고' , ' 관리' ,'통계']); 


  return (
    <div className='leftmenu'>
        {menu.map((val ,index) => 
            <div className='leftmenu_one'  key={index} >
                    <img  className='leftmenu_img' src={"src/assets/left_img" + index +  ".png"} alt="메뉴이미지" />
                {val}
            </div>
        )}
    </div>
  )
}

export default LeftMenu
