import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { Provider,useSelector } from 'react-redux';
import { RootState, store, persistor } from '../store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // let userName = useSelector((state: RootState) => state.auth);
  // console.log(userName,'root')

  
  // const isLogged = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null

  // useEffect(() => {
  //   if(isLogged === null) {
  //     router.replace('/login');
  //   }if(isLogged !== null) {
  //     router.replace('/');
  //   }
  // },[])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       (<Component {...pageProps} />)
       </PersistGate>
    </Provider>
  )
}

export default MyApp
