import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLogged = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null

  useEffect(() => {
    if(isLogged === null) {
      router.replace('/login');
    }else {
      router.replace('/');
    }
  }, [])

  return (
    <Provider store={store}>
       (<Component {...pageProps} />)
    </Provider>
  )
}

export default MyApp
