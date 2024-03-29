import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import "bootstrap/dist/css/bootstrap.css"
import Header from './header'
import Search from './search/search'
import BrandsLogo from './brandsLogo'
import Footer from './footer'
import style from "./common.module.css"
import { ToastContainer } from 'react-toastify'
import Blog from './blog'
import Category from './category'
import WhatsApp from './whatsapp'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>SpareTrade</title>
        <meta name="description" content="SpareTrade is a platform for buying and selling spare parts for various products. Find the best deals here. Find high-quality spare parts for ACs, air coolers, mixer grinders, and refrigerators at SpareTrade. Browse our extensive inventory and enjoy hassle-free buying and selling online." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       
      <div className='container'>
        <div className=' row d-flex justify-content-center'>
          <div className='col-12 col-md-8'>

            <Search />
            <BrandsLogo />
            <Category />
            <Blog />
        <ToastContainer />
          </div>
        </div>
      </div>
      
<div className='whatsAppCss'><WhatsApp />
</div>

      {/* <>
        <div className=' container'>
          <div className='d-flex align-items-center justify-content-center' style={{ width: "100%", height: "100vh", top: "50%" }}>
            <div className='row d-flex align-items-center' >
              <div className='col-12 col-md-4 col-lg-4'>
              </div>

              <div className='col-12 col-md-4 col-lg-4'>
                <img src='https://www.seekpng.com/png/detail/279-2795569_web-development-web-development-illustration-png.png' alt='dev' className='img-fluid' height={500} width={800} />
              </div>
              <div className='col-12 col-md-4 col-lg-4'>
              </div>
              <div className='col-12 col-md-3 col-lg-3'>
              </div>

              <div className='col-12 col-md-6 col-lg-6 mt-5'>

                <h3 className='text-center'>We are under Development.</h3>

              </div>
              <div className='col-12 col-md-3 col-lg-3'>
              </div>

            </div>
          </div>
        </div>

        <ToastContainer />
      </> */}
    </>
  )
}
