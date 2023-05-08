'use client'

import { useSession } from "next-auth/react";
import { useState } from "react";
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from "../firebase";
import { toast } from 'react-hot-toast';
import useSWR from 'swr';

type Props = {
    chatId : string;
}

export default function ChatInput({chatId} : Props) {
    const [prompt, setPrompt] = useState("");
    const {data: session} = useSession();
    const { data: model, mutate: setModel } = useSWR('model', {
        fallbackData: 'text-davinci-003'
    });

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createAt:serverTimestamp(),
            user:{
                _id:'user', 
                name: 'name',
                avata: 'user_image' || 'https://links.papareact.com/2i6'
            }
        }

        await addDoc(
            collection(db, "users", session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        const notification = toast.loading('Chat GPT thinking...');

        await fetch('/api/askQuestion',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({  
                prompt: input,
                chatId,
                model,
                session
            })
        }).then(() => {
            toast.success('chat gpt has responed',{
                id: notification,
            })
        })
    } 

    return (
        <div className="bg-transparent text-sm focus:outline-none
        flex-1 disabled:cursor-not-allowed disabled:text-gray-300">
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex-1">
                <input
                className="bg-transparent focus:ouline-none flex-1"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                type="text"
                placeholder="type meesage here..."
                 />
                <button className="bg-[#11a37f] hover:opaticy-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed">Submit</button>
            </form>
        </div>
    )
}
