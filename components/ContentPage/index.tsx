'use client';

import React, { useState } from 'react';
import styles from './ContentPage.module.scss';
import Sidebar from '../../layout/sidebar';
import Header from '../../layout/header';
import {
    setLocal
  } from '../../store/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from '../../modules/Accounts/Login';
import { RootState } from '../../store/store';

type Props = {
    children : React.ReactNode
}

export default function ContentPage({children} : Props) {
    // let isLogged : any = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null
    // if(isLogged) {
    //   isLogged = JSON.parse(isLogged);
    // }
    // const userName = isLogged?.username;
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleShowMenu = () => {
        setShow(true);
    }
    const handleCloseMenu = () => {
        setShow(false);
    }

    // dispatch(setLocal());
    const isLogged : any = useSelector((state :  RootState) => state.auth)

    console.log(isLogged,'login content');

    return (
        <>  
            { (!isLogged.isLoggedIn) ? (
                <LoginPage />
            ) : (
                <>   
                    <Header funcShowMenu={handleShowMenu} username={isLogged?.username} />
                    <div className="flex">
                        <Sidebar funcCloseMenu={handleCloseMenu} handeShow={show} user={isLogged?.username}/>
                        <div className="bg-[#343541] w-full">
                            {children}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
