"use client"

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, query, orderBy} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

type Props = {
    chatId : string;
    user: string
}

function Chat({chatId, user} : Props) {
    localStorage.setItem("myCat", "user3");
    const userName : any = localStorage.getItem('myCat');
    const {data: session} = useSession();
    ///console.log(user, chatId,'ssss');
    const [messages, loading] = useCollection(query(
        collection(db, 'users', userName, 'chats', chatId, 'messages'),
        orderBy("createAt", 'asc')
    ))

    console.log(messages);
    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {messages?.empty && (
                <>
                    <p className="mt-10 text-center text-white">Type a prompt in below to get started!</p>
                    <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce"/>
                </>
            )}
            {messages?.docs.map((message) =>(
                <Message key={message.id} message={message.data()} />
            ) )}
            { loading && (
                    <p>loading...</p>
            )}
        </div>
    )
}

export default Chat
