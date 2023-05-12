import styles from './header.module.scss'
import { FaBars } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from '../../firebase';

import { useState } from 'react';

type Props = {
    funcShowMenu: Function,
    username: string
    
}

export default function Header({funcShowMenu, username} : Props) {
    const router = useRouter();
    const createNewChat = async () => {
        const  doc = await addDoc(collection(db,"users", username, "chats"),{
            userId: 'userid',
            createAt: serverTimestamp()
        })
        router.push(`/chat/${doc.id}`)

    }
    
    return (
        <div className={`${styles.header} p-2`}>
            <div className={styles.toggleMobile}>
                <FaBars className="cursor-pointer hover:opacity-7" onClick={() => funcShowMenu()} />
            </div>
            <div>
                New Chat
            </div>
            <div className="cursor-pointer hover:opacity-7"  onClick={() => createNewChat()}>
                <AiOutlinePlus />
            </div>
        </div>
    )
}