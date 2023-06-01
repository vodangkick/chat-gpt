import styles from './header.module.scss'
import { FaBars } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from '../../firebase';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    funcShowMenu: Function,
    username: string
    
}

export default function Header({funcShowMenu, username} : Props) {
    const router = useRouter();
    const { t } = useTranslation();
    const createNewChat = async () => {
        const  doc = await addDoc(collection(db,"users", username, "chats"),{
            userId: 'userid',
            createAt: serverTimestamp()
        })
        router.push(`/chat/${doc.id}`)
    }
    
    return (
        <div className={`${styles.header} p-2 fixed w-full`}>
            <div className={styles.toggleMobile}>
                <FaBars className="cursor-pointer hover:opacity-7 h-8 w-8" onClick={() => funcShowMenu()} />
            </div>
            <div className="text2xl">
                {t('New Chat')}
            </div>
            <div className="cursor-pointer hover:opacity-7"  onClick={() => createNewChat()}>
                <AiOutlinePlus className="h-8 w-8" />
            </div>
        </div>
    )
}