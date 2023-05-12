"use client";
import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from '../../firebase';

type Props = {
    id : string,
    username: string
}

function NewChat({id, username} : Props) {
    const router = useRouter();
    const createNewChat = async () => {
        const  doc = await addDoc(collection(db,"users", username, "chats"),{
            userId: 'userid',
            createAt: serverTimestamp()
        })
        router.push(`/chat/${doc.id}`)

    }
    return (
        <div onClick={createNewChat} className="mt-2 border-gray-700 border chatRow mb-2">
            <PlusIcon className="w-4 h-4" />
            <p>New Chat</p>
        </div>
    )
}

export default NewChat
