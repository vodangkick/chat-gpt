'use client';

import React, { useState, useEffect } from 'react';
import styles from './ContentPage.module.scss';
import Sidebar from '../../layout/sidebar';
import Header from '../../layout/header';
import {
    setLocal
  } from '../../store/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from '../../modules/Accounts/Login';
import { RootState } from '../../store/store';
import LoadingFull from '../commons/CompLoading/LoadingFull';
import ComPopup from '../commons/CompPopup';

type Props = {
    children : React.ReactNode
}

export default function ContentPage({children} : Props) {

    const [loading, setLoading] =  useState(false);
    const [themes, setThemes] =  useState<any>(null);

   
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleShowMenu = () => {
        setShow(true);
    }
    const handleCloseMenu = () => {
        setShow(false);
    }

    useEffect(() => {
        setLoading(true)
    },[])
    const isLogged : any = useSelector((state :  RootState) => state.auth)
    const themeRoot : any = useSelector((state :  RootState) => state.setting.themeRoot);
    console.log(themeRoot, 'theme sdsd');
    

    return (
        <>  
            <div className={`${themeRoot}`}>
                {!loading && <LoadingFull/>}

                { (!isLogged.isLoggedIn) ? (
                    <LoginPage />
                ) : (
                    <>   
                        <Header funcShowMenu={handleShowMenu} username={isLogged?.username} />
                        <div className="flex">
                            <Sidebar funcCloseMenu={handleCloseMenu} handeShow={show} user={isLogged?.username}/>
                            <div className={`bgContent w-full overflow-hidden`}>
                                {children}
                            </div>
                        </div>
                        <ComPopup />
                    </>
                )}
            </div>
        </>
    )
}
