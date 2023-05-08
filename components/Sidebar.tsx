'use client'

import { useSession,signOut } from 'next-auth/react'
import {useCollection} from 'react-firebase-hooks/firestore';
import React from 'react'
import NewChat from './NewChat'
import { db } from '../firebase';
import { collection } from 'firebase/firestore';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';

function Sidebar() {
    const {data : session} = useSession();
    const [chats, loading, error] = useCollection(
        session && collection(db,'users',session?.user?.email!,"chats")
    );

    return (
        <div className="p-2 flex flex-col h-screen">
            <div className="flex-1">
                {/* { new chat } */}
                <NewChat id="" />
                <div className="hidden sm:inline">
                    <ModelSelection />
                </div>
                <div className="flex flex-col space-y-2 my-2">
                    { loading && (
                        <div className="animate-pulse text-center text-white">
                            <p>Loading chats...</p>
                        </div>
                    )}
                    {chats?.docs.map(chat => (
                        <ChatRow key={chat.id} id={chat.id} />
                    ))}
                </div>
                
            </div>

            {session && 
                <img onClick={()=> signOut()} src="https://links.papareact.com/2i6" alt="profile pic"
                className="h-12 w-15 cursor-pointer mx-auto mb-2 hover:opacity-50" />
            }
            {/* <img src="https://links.papareact.com/2i6" alt="profile pic"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50" /> */}
        </div>
    )
}

export default Sidebar
