import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import "bootstrap/dist/css/bootstrap.css"
import Header from './components/header/header'
import Search from './components/search/search'
import BrandsLogo from './components/brandsLogo'
import Footer from './components/footer/footer'
//dfghjkl
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Header/>
      <Search/>
      <BrandsLogo/>
      <Footer/>
    </>
  )
}
