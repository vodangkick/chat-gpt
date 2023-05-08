import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { doc, collection, deleteDoc } from "firebase/firestore"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Router } from "next/router"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

import { db } from "../firebase"

type Props = {
    id : string
}

function ChatRow({id} : Props) {
    const pathname = usePathname();
    const router = useRouter();
    const {data:session} = useSession();
    const [active, setAvtive] = useState(false);
    const [messages] = useCollection(
        collection(db, 'users', session?.user?.email!, 'chats', id,'messages'),
    )
    useEffect(() => {
        if(!pathname) return;
        setAvtive(pathname.includes(id));

        console.log(active);

    },[pathname])

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
        router.replace('/');
    }

    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center`}>
            <ChatBubbleLeftIcon className="w-5 w-5" />
            <p className="flex-1 hidden md:inline-flex truncare">
                {messages?.docs[messages?.docs.length - 1]?.data().text || "New chat"}
            </p>
            <TrashIcon onClick={removeChat} className="w-5 w-5 text-gray-700 hover:text-red-700" />
        </Link>
    )
}

export default ChatRow
