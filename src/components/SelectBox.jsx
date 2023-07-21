import { useState } from 'react'


function SelectBox(props) {
    const { selectBox , select , setSelect , onClickValue } = props
 
    const [selectState, setSelctState] = useState(false);

    const onSelectToggle = (e) => {
        e.stopPropagation();
        setSelctState(!selectState);
    }

    const onClickSelectOne = (e) => {
        let one = e.target.attributes.value.value;
        setSelect(one);
    }

    return (
        <div className='select_box' onClick={onSelectToggle} >
            {selectBox[select][0]}

            {selectState && (
                <div className='select_box_container' >
                    {selectBox.map((val, index) => (
                        <div className='select_box_one' key={index} value={index} onClick={onClickSelectOne} >
                            {val[0]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectBox
