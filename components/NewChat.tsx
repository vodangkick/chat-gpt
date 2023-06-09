"use client";
import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from '../firebase';

type Props = {
    id : string
}

function NewChat({id} : Props) {
    const router = useRouter();
    const {data: session} = useSession();
    const createNewChat = async () => {
        const  doc = await addDoc(collection(db,"users", 'user3', "chats"),{
            userId: 'userid',
            createAt: serverTimestamp()
        })

        router.push(`/chat/${doc.id}`)

    }
    return (
        <div onClick={createNewChat} className="border-gray-700 border chatRow">
            <PlusIcon className="w-4 h-4" />
            <p>New Chat</p>
        </div>
    )
}

export default NewChat
