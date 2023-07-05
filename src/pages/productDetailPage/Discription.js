import React from 'react';

function Discription(props) {
   
    return (
        <div className="card-body">
            <p style={{whiteSpace:"pre-wrap"}}> {props?.getSparePart?.description}.</p>
            {/* <p>Donec ut libero imperdiet, eleifend ipsum vitae, laoreet nisl. Morbi volutpat dui vitae efficitur posuere. Pellentesque mi libero, dapibus ut tellus eu, volutpat viverra magna. Phasellus vitae erat porta, condimentum enim ac, luctus dui. Fusce dignissim, neque quis aliquet posuere, ante tortor lobortis eros, et facilisis dolor ipsum malesuada ante.</p> */}
        </div>
    )
}
export default Discription