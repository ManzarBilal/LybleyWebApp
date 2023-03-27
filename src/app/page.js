import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

      <div>
      <Header />
      <Footer />
      </div>
   
  )
}
