'use client';

import React, { useState } from 'react';
import styles from './ContentPage.module.scss';
import Sidebar from '../../layout/sidebar';
import Header from '../../layout/header';
import {
    setLocal
  } from '../../store/reducers/auth';
import { useDispatch } from 'react-redux';

type Props = {
    children : React.ReactNode
}

export default function ContentPage({children} : Props) {
    let isLogged : any = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null
    if(isLogged) {
      isLogged = JSON.parse(isLogged);
    }
    const userName = isLogged?.username;
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleShowMenu = () => {
        setShow(true);
    }
    const handleCloseMenu = () => {
        setShow(false);
    }

    dispatch(setLocal());

    return (
        <>
            <Header funcShowMenu={handleShowMenu}/>
                    <div className="flex">
                        <Sidebar funcCloseMenu={handleCloseMenu} handeShow={show} user={userName}/>
                        <div className="bg-[#343541] w-full">
                            {children}
                        </div>
                    </div>
                    {/* <div className={`${styles.pageContent} flex` }>
                        <Sidebar funcCloseMenu={handleCloseMenu} handeShow={show}/>
                        <div className="lg:w-[calc(100%-260px)] flex-col flex h-screen bg-gray-700 flex-1">
                            {children}
                        </div>
                    </div> */}
        </>
    )
}
