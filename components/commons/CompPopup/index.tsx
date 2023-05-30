'use client';

import {useEffect} from 'react';
import styles from './ComPopup.module.scss';
import { IoMdClose } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { BsFillDatabaseFill } from 'react-icons/bs'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import setting, { setPopup, setTheme } from '../../../store/reducers/setting';
import { RootState } from '../../../store/store';
import { collection, deleteDoc, doc, DocumentData } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase';



export default function ComPopup() {
    const popup : boolean = useSelector((state: RootState) => state.setting.popup);
    const themeRoot : string = useSelector((state: RootState) => state.setting.themeRoot);
    const userName : any = useSelector((state: RootState) => state?.auth?.username);

    const [tab, setTag] = useState('general');
    const dispatch = useDispatch();

    const handleShowPopup = ()=> {
        dispatch(setPopup(false));
    }
    const handleTagActive = ( value :  string)=> {
        setTag(value);
    }

    const handleTheme = (value : string)=> {
        console.log(value);
        dispatch(setTheme(value));
    }

    const [chats, loading, error] = useCollection(
        userName && collection(db,'users', userName,"chats")
    );

    const removeChat = () => {
        chats?.docs.forEach(async (item : DocumentData ) => {
            await deleteDoc(doc(db, 'users', userName, 'chats', item?.id));
        })
    }
    
    return (
        <>  
            <div className={`${styles.popUp} ${popup && styles.openPopup} fixed items-center justify-center bg-gray-600/90 w-full h-screen top-0`}>
                <div className={`${styles.popUpContainer} m-5 bg-gray-900 lg:w-[680px] lg:min-h-[400px] mt-5 rounded-lg p-5`}>
                    <div className={`${styles.popUpHeader} flex items-center`}>
                        <h2 className="text-lg font-medium leading-6">Setting</h2>
                        <IoMdClose className={`${styles.popUpClose} w-6 h-6`} onClick={()=>handleShowPopup()} />
                    </div>
                    <div className={`${styles.popUpcontent} flex flex-row`}>
                        <div className={`${styles.popUpLeft} flex basis-1/3`}>
                            <ul className={styles.menuTags}>
                                <li onClick={() => handleTagActive('general')} className={`${tab === 'general' && styles.activeTag  }`}>
                                    <AiFillSetting className="mr-2 h-4 w-4" />
                                    <span>General</span>     
                                </li>
                                <li onClick={() => handleTagActive('data')} className={`${tab === 'data' && styles.activeTag  }`} >
                                    <BsFillDatabaseFill className="mr-2 h-4 w-4" />
                                    <span>Data Controls</span>  
                                </li>
                            </ul>
                        </div>
                        <div className={`${styles.popUpRight} flex basis-2/3`}>
                            {tab === 'general' && (
                                <div className={`${styles.contentTag}`}>
                                    <ul>
                                        <li>
                                            <span>Theme</span>
                                            <span>
                                                <select onChange={(e) => handleTheme(e.target.value)} id="countries" className="text-black rounded border border-black/10 bg-transition">
                                                    <option selected value="dark">Dark</option>
                                                    <option value="light">Light</option>
                                                </select>
                                            </span>
                                        </li>
                                        <li>
                                            <span>Clear all chats</span>
                                            <span onClick={() => removeChat()}>
                                                <button>Clear</button>
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            ) }
                            {tab === 'data' && (
                                <div>
                                    The feature working ...
                                </div>
                            ) }
                        </div>
                        
                    </div>
                </div>
            </div>    
        </>
    )
}
