import '../styles/globals.scss'

import type { AppProps } from 'next/app';
import { Provider,useSelector } from 'react-redux';
import { RootState, store, persistor } from '../store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/multil_language/i18n';
import 'regenerator-runtime/runtime';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <PersistGate loading={null} persistor={persistor}>
          (<Component {...pageProps} />)
        </PersistGate>
       </I18nextProvider>
    </Provider>
  )
}

export default MyApp
