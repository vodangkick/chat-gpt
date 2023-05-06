import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.scss';
import {
  login
} from '../../../store/reducers/auth';
import { RootState, AppDispatch }  from '../../../store/store'
import { useRouter } from 'next/router';
import Link from 'next/link';
import LoadingFull from '../../../components/commons/CompLoading/LoadingFull';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [username, setUsernameState] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isLogged = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null

  useEffect(() => {
    if(isLogged === 'true' || isLoggedIn === true) {
      router.replace('/');
    }
  },[isLoggedIn])

  const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login({username, password}));
  }
  // const { data } = useSession()

  // console.log(data,'session');

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }


  return (
    <>
    
      {isLoading && (
        <LoadingFull />
      )}
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h1>Welcome Chat GPT</h1>
        { error && <p className="mt-2 text-amber-500">Email or passwor is invalid</p>}
        <div>
          <input
            type="text"
            value={username}
            onChange={e => setUsernameState(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button>Continue</button>
        <Link href="/register">Register</Link>
      </form>
      
    </>
  );
};

export default LoginPage;

