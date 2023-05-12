import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Login/login.module.scss';
import styles2 from './register.module.scss';

import {
  register
} from '../../../store/reducers/auth';
import { RootState, AppDispatch }  from '../../../store/store'
import { useRouter } from 'next/router';
import Link from 'next/link';
import LoadingFull from '../../../components/commons/CompLoading/LoadingFull';

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [username, setUsernameState] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isLogged = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null
  
  useEffect(() => {
    if(isLogged === 'true' || isLoggedIn === true) {
      router.replace('/');
    }
  },[isLoggedIn])
  
  const handleRegister = () => {
    dispatch(register({email, username, password}))
  }
  return (
    <>  
        { isLoading && (
          <LoadingFull />
        )}
        <div className={styles.loginForm}>
            
            <h1>Welcome Chat GPT</h1>
            <div className="mt-3">
              { error && Object.keys(error).map((key) =>
                  <div className={`${styles2.error} text-red-700`} key={key}>{key} {error[key]}</div>
              )}
            </div>
            <div>
                <input
                type="text"
                value={username}
                onChange={e => setUsernameState(e.target.value)}
                placeholder="Username"

                />
            </div>
            <div>
                <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"

                />
            </div>
            <div>
                <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                />
            </div>
            <button onClick={() => handleRegister()}>Submit</button>
            <div className={`${styles.textBottom} mt-5 items-center`}>
              Don't have an account? <Link className="text-[#10a37f]" href="/login">Login</Link>
            </div>
        </div>
    </>
  );
};

export default RegisterPage;

