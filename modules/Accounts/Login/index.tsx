'use client';

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
import Image from 'next/image';
import github from '../../../images/github.png';
import { AiOutlineEye } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../../components/commons/CompMultiLanguage/LanguageSwitcher';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  //const router = useRouter();
  const [username, setUsernameState] = useState<any>(null);
  const [password, setPassword] = useState<any>(null);
  const [showPassword, setShowPassword] = useState<any>('password');
  const { t } = useTranslation();


  const error = useSelector((state: RootState) => state.auth.error);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch(login({username, password}));
  }

  const handleShowPass = () => {
      if(showPassword === 'password') {
        setShowPassword('text')
      }else if(showPassword === 'text') {
        setShowPassword('password')
      }
  }
  

  return (
    <>
      {isLoading && (
        <LoadingFull />
      )}
      <form className={`${styles.loginForm}`} onSubmit={handleLogin}>
        <div className={`${styles.selectLang}`}>
            <div>{t('Select Language')}</div>
            <div><LanguageSwitcher/></div>
        </div>
        <h1>{t('Welcome to ChatGPT')}</h1>
      { error && <p className={`${styles.error} text-red-700 font-bold`}>{t('Email or passwor is invalid')}</p>}
        <div>
          <input
            type="text"
            value={username}
            onChange={e => setUsernameState(e.target.value)}
            placeholder={`${t("Username")}`}
          />
        </div>
        <div className={`${styles.groupInput}`}>
          <input
            type={showPassword}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={`${t("Password")}`}
          />
          <AiOutlineEye onClick={() => handleShowPass()} className={`${styles.showPass} w-5 h-5 text-green`} />
        </div>
        <button>{t('Login')}</button>
        
        
        <div className={`${styles.textBottom} mt-5 items-center`}>{t(`Don't have an account?`)}
        <Link className="text-[#10a37f]" href="/register">{t(`Sign up Here`)}</Link>
        </div>
        {/* <div className={styles.buttonsConnect}>
            <span className={styles.buttonIcon}>
                <Image src={github} alt=""/>
                <p>Login with Github</p>
            </span>
        </div> */}
      </form>
      
    </>
  );
};

export default LoginPage;

