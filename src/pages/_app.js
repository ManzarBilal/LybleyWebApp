import persistStor from '@/redux/store/persistStore'
import store  from '@/redux/store/store'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {

  return <Provider store={store}>
    {/* <PersistGate persistor={persistStor}> */}
      <Component {...pageProps} />
    {/* </PersistGate> */}
  </Provider>
}
