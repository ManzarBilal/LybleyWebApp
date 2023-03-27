import React, { useState } from 'react'
import brandsLogo from "../../../assets/pngTree.png";
const BrandsLogo = () => {
    const [logos,setLogo]=useState([
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
    ])
  return (
    <div className='container '>
        <div className='row d-flex justify-content-center'>
        {logos.map(img=>
        <div className='col-3'>
            <img src={img} alt="logo" height="100" />
        </div>
            )}
            </div>
    </div>
  )
}

export default BrandsLogo;