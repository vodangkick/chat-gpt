'use client'

import {useCollection} from 'react-firebase-hooks/firestore';
import React from 'react';
import NewChat from '../../components/CompNewChat';
import { db } from '../../firebase';
import { collection } from 'firebase/firestore';
import ChatRow from '../../components/CompChatRow';
import { useRouter } from 'next/navigation';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../store/reducers/auth';
import styles from './sidebar.module.scss';
import { AiOutlineClose, AiOutlineImport } from "react-icons/ai";
import { RootState } from '../../store/store';

type Props = {
    funcCloseMenu: Function,
    handeShow: boolean,
    user: String
}
function Sidebar({funcCloseMenu, handeShow, user} : Props) {
    let isLogged : any = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null
    if(isLogged) {
      isLogged = JSON.parse(isLogged);
    }

    //const userName = isLogged?.username;
    //const userName = user;
    //console.log(userName,'test');
    //const userName = 'user3';
    const userName = useSelector((state: RootState) => state.auth.username)
    
    const [chats, loading, error] = useCollection(
        collection(db,'users', userName,"chats")
    );

    const router = useRouter();
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logout());
        router.replace('/login');
    }
    

    return (
        <div className={`${styles.sidebar} ${handeShow ? 'openMenu' : ''}  h-screen overflow-y-auto`}>
            <div className={`p-2 flex flex-col h-screen`}>
                <div className="flex-1">
                    <NewChat id='' username={userName} />
                    <div className={styles.closeToggle} >
                        x
                    </div>
                    <div className="flex flex-col space-y-2 my-2">
                        { loading && (
                            <div className="animate-pulse text-center text-white">
                                <p>Loading chats...</p>
                            </div>
                        )}
                        {chats?.docs.map(chat => (
                            <ChatRow key={chat.id} id={chat.id} user={userName} />
                        ))}
                    </div>
                </div>
                <div className={`${styles.logOut} text-gray-700 flex items-center`} >
                    <AiOutlineImport className="flex flex-col mr-2 h-4 w-4" />
                    <p className="flex flex-col" onClick={()=> handleLogOut()} >Logout</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
