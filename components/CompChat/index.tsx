"use client"

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, query, orderBy, serverTimestamp, addDoc} from "firebase/firestore";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Message from "../CompMessage";
import Image from 'next/image';
import { useRef, useState, useEffect } from "react";
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import styles from './CompChat.module.scss';
import { TypeAnimation } from 'react-type-animation';




const API_KEY = "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";
const systemMessage = { 
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

type Props = {
    chatId : string,
    user: string
}

function CompChat({chatId,user} : Props) {
    let isLogged : any = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null
    if(isLogged) {
      isLogged = JSON.parse(isLogged);
    }

    //const userName = isLogged?.username;
    const userName = user;
    
    const [prompt, setPrompt] = useState("");
    const messageListRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null)
    const [loadingText, setTextLoading] = useState(false);
    let userName2 = useSelector((state: RootState) => state.auth);
   
    const [messages,loading,error] = useCollection(query(
        collection(db, 'users', userName, 'chats', chatId, 'messages'),
        orderBy("createAt", 'asc'),
    ))

    useEffect(() => {
        if (messageListRef !=null) {
          messageListRef.current!.scrollTop =
            messageListRef.current!.scrollHeight + 50;
        }
        
    }, [messages]);

    const [messages1, setMessages] = useState([
        {
          message: "Hello, I'm ChatGPT! Ask me anything!",
          sentTime: "just now",
          sender: "ChatGPT"
        }
      ]);
    
      const addChatGpt = async (message: Object) => {
          await addDoc(
              collection(db, "users", userName, 'chats', chatId, 'messages'),
              message
            )
      }
    
      const handleSend = async (e:React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if(!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const messageUser: Message = {
            text: input,
            createAt: serverTimestamp(),
            user:{
                _id: userName, 
                name: 'name',
                avata: 'user_image' || 'https://links.papareact.com/2i6'
            }
        }

        await addDoc(
            collection(db, "users", userName, 'chats', chatId, 'messages'),
            messageUser
        )

        const newMessage = {
          message: input,
          direction: 'outgoing',
          sender: "user"
        };
    
        const newMessages : any = [...messages1, newMessage];
        
        setMessages(newMessages);

        if (inputRef.current != null) { 
            inputRef.current.disabled = true;
        }

        setTextLoading(true);
        
        await processMessageToChatGPT(newMessages);
      };
    
      async function processMessageToChatGPT(chatMessages : any) { // messages is an array of messages
    
        let apiMessages = chatMessages.map((messageObject :  any) => {
          let role = "";
          if (messageObject.sender === "ChatGPT") {
            role = "assistant";
          } else {
            role = "user";
          }
          return { role: role, content: messageObject.message}
        });
        
        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [
            systemMessage,  
            ...apiMessages 
          ]
        }
    
        await fetch("https://api.openai.com/v1/chat/completions", 
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        }).then((data) => {
               return data.json();
        }).then((data) => {
          const messageChatGPT: Message = {
            text: data.choices[0].message.content || "chat gpt was unable to find an answer for that!",
            createAt: serverTimestamp(),
            user: {
                _id : "chatGPT",
                name: "chatGPT",
                avata: "https://links.papareact.com/2i6"
            }
          }
          addChatGpt(messageChatGPT); 
          if (inputRef.current !== null) { 
            inputRef.current.disabled = false;
          }

          setTextLoading(false);

          setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
          }]);
          
        });
      }
    return (
        <div className={styles.chatBox} ref={messageListRef}>
            <div className="text" >
                    {error && <strong>Error: {JSON.stringify(error)}</strong>}
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

                { loadingText && (
                  <div className="py-5 text-white bg-[#434654]">
                      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
                          <img src="https://links.papareact.com/2i6" alt="" className="h-8 w-8"/>
                          <p className="pt-1 text-sm">
                            <TypeAnimation
                                  sequence={[
                                      '', // Types 'One'
                                      1000,
                                  ]}
                                  cursor={true}
                                  repeat={Infinity}
                                  omitDeletionAnimation={true}
                              /> 
                          </p>
          
                      </div>
                  </div>
                )}
               
            </div>

            <div className={`${styles.chatInput} md:dark:border-transparent`}   >
                <form className="flex" onSubmit={handleSend}>
                    <input placeholder="Send a meesage..."
                    value={prompt}
                    ref={inputRef}
                    onChange={(e) => setPrompt(e.target.value)}
                    type="text" />
                    <button>
                        Submit
                    </button>
                </form>
                <p>ChatGPT Mar 23 Version. Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts</p>
            </div>
        </div>
    )
}

export default CompChat
