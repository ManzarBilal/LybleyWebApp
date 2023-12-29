import persistStor from '@/redux/store/persistStore'
import store  from '@/redux/store/store'
import '@/styles/globals.css'
import '@/styles/global1.scss'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Header from './header'
import Footer from './footer'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const currentPath = router.asPath;
  return <Provider store={store}>
    <PersistGate persistor={persistStor}>
    {currentPath.startsWith('/productDetailPage') || currentPath.startsWith('/userProfile')
    ? ""
    :  <Header />
}
      <Component {...pageProps} />
      <Footer />
    </PersistGate>
  </Provider>
}
