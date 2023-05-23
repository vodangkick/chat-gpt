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
  const [repassword, setRePassword] = useState<any>('');
  const [errorLocal, setErrorLocal] = useState<any>(null);


  const error = useSelector((state: RootState) => state.auth.error);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isLogged = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null
  
  useEffect(() => {
    if(isLogged === 'true' || isLoggedIn === true) {
      router.replace('/');
    }
  },[isLoggedIn])
  
  const handleRegister = (e : any) => {
    if(repassword === password ) {
      dispatch(register({email, username, password}))
      return true;
    }else {
      setErrorLocal('Comfirm password wrong');
      return false;
    }
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
                  <div className={`${styles2.error} text-red-700 font-bold`} key={key}>{key} {error[key]}</div>
              )}
              { errorLocal && <div className={`${styles2.error} text-red-700 font-bold`}>{errorLocal}</div>
              }
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
            <div>
                <input
                type="password"
                value={repassword}
                onChange={e => setRePassword(e.target.value)}
                placeholder="Comfirm password"
                />
            </div>

            <button onClick={(e) => handleRegister(e)}>Submit</button>
            <div className={`${styles.textBottom} mt-5 items-center`}>
              Go to <Link className="text-[#10a37f]" href="/">Login</Link> .
            </div>
        </div>
    </>
  );
};

export default RegisterPage;

