import { useState } from 'react'


function SelectBox2(props) {
    const { selectBox , checkValue , onClickValue , state} = props
 
    const [selectState, setSelctState] = useState(false);

    const onSelectToggle = (e) => {
        setSelctState(!selectState);
    }

    

    return (
        <div className='select_box' onClick={onSelectToggle} >
            전체

            {selectState && (
                <div className='select_box_container' >
                    {selectBox.map((val, index) => (
                        <div className='select_box_one' key={index}   >
                          <input className='selectCheckbox' defaultChecked={false} onClick={ e => e.stopPropagation() } type='checkbox' index={index} vlaue={checkValue[index]} checked={checkValue[index]}  onChange={(e) => onClickValue(e,state)} />{val[0]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectBox2
