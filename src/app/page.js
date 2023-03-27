"use client";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import Header from './components/header/header'
import Search from './components/search/search'
import Footer from './components/footer/footer'
import BrandsLogo from './components/brandsLogo/brandsLogo'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

      <div >
      <Header />
      <Search/>
      <BrandsLogo/>
      <Footer />
      </div>
   
  )
}
