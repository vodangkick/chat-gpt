'use client';

import {useEffect} from 'react';
import styles from './ComPopup.module.scss';
import { IoMdClose } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { BsFillDatabaseFill } from 'react-icons/bs'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import setting, { setPopup } from '../../../store/reducers/setting';
import { RootState } from '../../../store/store';


export default function ComPopup() {
    const popup = useSelector((state: RootState) => state.setting.popup);
    const [tab, setTag] = useState('general');
    const dispatch = useDispatch();
    const handleShowPopup = ()=> {
        dispatch(setPopup(false));
    }
    const handleTagActive = ( value :  string)=> {
        setTag(value);
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
                                                <select id="countries" className="text-black rounded border border-black/10 bg-transition">
                                                    <option selected value="US">System</option>
                                                    <option value="CA">Dark</option>
                                                    <option value="FR">Light</option>
                                                </select>
                                            </span>
                                        </li>
                                        <li>
                                            <span>Clear all chats</span>
                                            <span>
                                                <button>Clear</button>
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            ) }
                            {tab === 'data' && (
                                <div>
                                    Control Data
                                </div>
                            ) }
                        </div>
                        
                    </div>
                </div>
            </div>    
        </>
    )
}
