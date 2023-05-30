import '../styles/globals.scss'

import type { AppProps } from 'next/app';
import { Provider,useSelector } from 'react-redux';
import { RootState, store, persistor } from '../store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       (<Component {...pageProps} />)
       </PersistGate>
    </Provider>
  )
}

export default MyApp
