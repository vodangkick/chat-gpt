'use client'

import { useCollection } from 'react-firebase-hooks/firestore';
import React,{ useState, useRef, useEffect } from 'react';
import NewChat from '../../components/CompNewChat';
import { db } from '../../firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import ChatRow from '../../components/CompChatRow';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducers/auth';
import styles from './sidebar.module.scss';
import { AiOutlineClose,AiTwotoneDelete, AiOutlineImport, AiFillSetting, AiOutlineUser } from "react-icons/ai";
import { BiSupport } from 'react-icons/bi';
import { IoMdClose } from "react-icons/io";
import Link from "next/link"
import { RootState } from '../../store/store';
import CompLoading from '../../components/commons/CompLoading';
import ComPopup from '../../components/commons/CompPopup';
import { setPopup } from '../../store/reducers/setting';
import { DocumentData } from "firebase/firestore";



type Props = {
    funcCloseMenu: Function,
    handeShow: boolean,
    user: String
}
function Sidebar({funcCloseMenu, handeShow, user} : Props) {
    const userName : any = useSelector((state: RootState) => state?.auth?.username);
    const [ showMenu, setShowMenu ] = useState<boolean>(false);
    const dispatch = useDispatch();
    const refMenuBottom = useRef<any>(null);

    const [chats, loading, error] = useCollection(
        userName && collection(db,'users', userName,"chats")
    );

    const router = useRouter();
    const handleLogOut = () => {
        dispatch(logout());
    }
    const handleShowMenuBottom = () => {
        if(showMenu === false) {
            setShowMenu(true);
        }else if(showMenu === true){
            setShowMenu(false);
        }
    }
    const handleShowPopup = () => {
        dispatch(setPopup(true));
        setShowMenu(false);
    }

    const removeChat = () => {
        chats?.docs.forEach(async (item : DocumentData ) => {
            await deleteDoc(doc(db, 'users', userName, 'chats', item?.id));
        })
        setShowMenu(false);
    }

    useEffect(() => {
        document.addEventListener("click", handleOutside, true)
    }, [])

    const handleOutside = (e:any) => {
        if(!refMenuBottom?.current?.contains(e.target)) {
            setShowMenu(false);
        }
    }
    

    return (
        <div className={`${styles.sidebar} ${handeShow && styles.openMenu} h-screen`}>
            <div className={`p-2 flex flex-col h-screen`}>
                <div className="flex-1">
                    <NewChat id='' username={userName} className="" />
                    <div className={`${styles.closeToggle} text-3xl`} onClick={()=>funcCloseMenu()} >
                        <IoMdClose />
                    </div>
                    <div className={`${styles.contentRow} flex flex-col space-y-2 my-2`}>
                        { loading && (
                            <CompLoading/>
                        )}
                        {chats?.docs.map(chat => (
                            <ChatRow funcCloseMenu={funcCloseMenu} key={chat.id} id={chat.id} user={userName} />
                        ))}
                    </div>
                </div>
                <div className={`${styles.logOut} text-gray-700 flex items-center`} >
                    <div className="flex items-center" onClick={() => handleShowMenuBottom()}>
                        <AiOutlineUser className="flex flex-col mr-2 h-4 w-4" />
                        <p className="flex flex-col" >{userName}</p>         
                    </div>
                    <ul ref={refMenuBottom} className={`${styles.menuBottom} ${showMenu && styles.openMenu}`} >
                        <li>
                            <Link className="flex" href="mailto:quang115thd@gmail.com">
                                <BiSupport className="flex flex-col mr-2 h-4 w-4" />
                                <span>Help & FAQ</span>
                            </Link>
                        </li>
                        <li onClick={() => removeChat()} >
                            <AiTwotoneDelete className="flex flex-col mr-2 h-4 w-4" />
                            <span>Clear Chat</span>
                        </li>
                        <li onClick={()=>handleShowPopup()}>
                            <AiFillSetting  className="flex flex-col mr-2 h-4 w-4" />
                            <span>Setting</span>
                        </li>
                        <li>
                            <AiOutlineImport className="flex flex-col mr-2 h-4 w-4" />
                            <span onClick={()=> handleLogOut()} >Log out</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
