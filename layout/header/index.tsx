import styles from './header.module.scss'
import { FaBars } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

import { useState } from 'react';

type Props = {
    funcShowMenu: Function
}


export default function Header({funcShowMenu} : Props) {
    
    return (
        <div className={`${styles.header} p-2`}>
            <div className={styles.toggleMobile}>
                <FaBars onClick={() => funcShowMenu()} />
                {/* <FaBars /> */}
            </div>
            <div>
                New Chat
            </div>
            <div>
                <AiOutlinePlus />
            </div>
        </div>
    )
}