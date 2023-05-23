"use client";
import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from '../../firebase';

type Props = {
    id : string,
    username: string,
    className: string | undefined
}

function NewChat({id, username, className} : Props) {
    const router = useRouter();
    const createNewChat = async () => {
        const  doc = await addDoc(collection(db,"users", username, "chats"),{
            userId: 'userid',
            createAt: serverTimestamp()
        })
        router.push(`/chat/${doc.id}`)

    }
    return (
        <div onClick={createNewChat} className={`${className ? className : ''} mt-2 border-gray-700 border chatRow mb-2`}>
            <PlusIcon className="w-4 h-4 mr-2" />
            <p>New Chat</p>
        </div>
    )
}

export default NewChat
