import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { useState } from 'react'

 
 const ProductDescription = () => {
    const [imageP,setImageP]=useState(["https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png"
,"https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png"
,"https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png",
"https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png",
"https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png"
])
  return (
    <div className='container'>
          <div>
             <img src='https://images.jdmagicbox.com/quickquotes/images_main/imlvo8wloe-148846219-g70if.jpg' alt='3D image' height="150" width="200" />
          </div>
          <div className='row'>
            {imageP?.map((item,i)=>
            <div className='col-2' key={i}>
              <img src={item} alt='3D image' height="150" width="200" />
            </div>
             )}
          </div>
    </div>
  )
}
export default ProductDescription;