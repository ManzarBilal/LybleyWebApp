import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';
import Cards from '../cards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpareParts } from '@/redux/actions/sparePart';
import ReactPlayer from 'react-player';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const ProductDetail = () => {


  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const [hasWindow, setHasWindow] = useState(false);
  const [videoUrl, setVideoUrl] = useState(['https://youtu.be/0BIaDVnYp2A'
  , 'https://youtu.be/0BIaDVnYp2A'
  , 'https://youtu.be/0BIaDVnYp2A', 'https://youtu.be/0BIaDVnYp2A', 'https://youtu.be/0BIaDVnYp2A', 'https://youtu.be/0BIaDVnYp2A'])
const playerRef = useRef(null);

  const getSpareParts = useSelector(state => state?.spareParrts);

  
  const [age, setAge] = React.useState('Option');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  
  useEffect(() => {

    dispatch(getAllSpareParts(id));
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, [dispatch])
  
  console.log("getSpareParts");
  return (
    <div className='bg_image'>
      <Header />
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-12'>

            <img src='https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png' className='rounded-circle' height="200" width="200" />
            <div className='row mt-5'>
            <div className='mb-3'><h2>Spare Parts</h2></div>

              {getSpareParts?.map((img1,i) =>
                <div className='col-md-3 col-6 d-flex justify-content-center mb-4'key={i} ><Link href={`/detail?id=${img1?._id}`} className="text-decoration-none text-dark"> <Cards img={img1?.images[0]} title={"Best Price - " + img1?.bestPrice +" INR"} mrp={"MRP - "+img1?.MRP+" INR"} brand={true} /> </Link></div>
              )}
            </div>

          </div>
        </div>
        <div>
            <div className='row mt-5'>
              <div className='col-9'></div>
              <div className='col-md-3 col-12'>
                <Box  >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Option</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Option"
                      size='small'
                      style={{ backgroundColor: "white" }}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Option1</MenuItem>
                      <MenuItem value={20}>Option2</MenuItem>
                      <MenuItem value={30}>Option3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div className='row mt-5'>
              {videoUrl?.map((url, i) => (<div className='col-md-3 col-6 mb-3' key={i}>
                {hasWindow && <ReactPlayer ref={playerRef} url={url} controls height="250" width="200" />}
              </div>))}

            </div>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail;