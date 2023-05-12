'use client'
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { doc, collection, deleteDoc } from "firebase/firestore"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Router } from "next/router"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import styles from './CompChatRow.module.scss';

import { db } from "../../firebase"

type Props = {
    id : string,
    user: string,
    funcCloseMenu: Function
}

function ChatRow({id, user,funcCloseMenu} : Props) {

    const pathname = usePathname();
    const router = useRouter();
    const [active, setAvtive] = useState(false);
    const username = 'user3';

    const [messages] = useCollection(
        collection(db, 'users', username, 'chats', id,'messages'),
    )
    useEffect(() => {
        if(!pathname) return;
        setAvtive(pathname.includes(id));

    },[pathname])

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', user, 'chats', id));
        router.replace('/');
    }

    return (
        <Link href={`/chat/${id}`} onClick={()=>funcCloseMenu()} className={`${styles.chatRow} chatRow justify-center ${active && 'bg-[#434654]'}`}>
            <ChatBubbleLeftIcon className="w-5 w-5" />
            <p className="flex-1 truncare pl-2">
                {messages?.docs[messages?.docs.length - 1]?.data().text || "New chat"}
            </p>
            <TrashIcon onClick={removeChat} className="w-5 w-5 text-gray-700 hover:text-red-700" />
        </Link>
    )
}

export default ChatRow
