'use client'
import { doc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import { Router } from "next/router"
import { useEffect, useState, useRef } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import styles from './CompChatRow.module.scss';
import { useTranslation } from "react-i18next";
import { TiTick } from 'react-icons/ti';
import { AiFillEdit, AiOutlineClose } from 'react-icons/ai';
import { BsChatSquareFill, BsTrash3 } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";


type Props = {
    id : string,
    title: string,
    funcCloseMenu: Function,
    user: string,
}

function ChatRow({id, user, title, funcCloseMenu} : Props) {
    const { t } = useTranslation();
    const [updateTitle, setUpdateTilte] = useState<string>(title);
    const [edit, setEdit] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [active, setAvtive] = useState(false);
    const refInputEdit = useRef<HTMLInputElement>(null);
    const refChatItem = useRef<HTMLAnchorElement>(null);



    const [messages] = useCollection(
        collection(db, 'users', user, 'chats', id,'messages'),
    )

    useEffect(() => {
        if(!pathname) return;
        setAvtive(pathname.includes(id));

    },[pathname])

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', user, 'chats', id));
        router.replace('/');
    }

    const updateTitleDB = async () =>  {
        const updatedTitle = {
          title: updateTitle,
        };
    
        try {
          const titleRef = doc(db,'users', user, 'chats', id);
          updateDoc(titleRef, updatedTitle);
        } catch (error) {
          console.error(error);
        }
      }

    const handleUpdateTitle = (e : any) => {
        e.preventDefault();
        updateTitleDB();
        setEdit(false);
    }

    const handleEdit = () => {
        if (refInputEdit.current !== null) { 
            refInputEdit?.current?.focus();
        }
        setEdit(true);
    }

    const handleLink = (e : any) => {
        if(edit) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleChatItem, true);
        if(edit) {
          refInputEdit?.current?.focus();
        }
       // return document.removeEventListener('click', handleChatItem, true);
    },[edit])
    
    const handleChatItem = (e: any) => {
        if(!refChatItem?.current?.contains(e.target)){
            setEdit(false);
        }
    }
    
    return (
        <Link ref={refChatItem} href={`/chat/${id}`} onClick={(e)=>handleLink(e)} className={`${styles.chatRow} chatRow justify-center ${active && styles.activeLink}`}>
            <BsChatSquareFill className="w-5 w-5" />
            <p className="flex-1 truncare pl-2">
                {/* {messages?.docs[messages?.docs.length - 1]?.data().text || t("New chat")} */}

                { edit && 
                    <form className={styles.formEdit}>
                        <span className={styles.formEditLeft}>
                            <input ref={refInputEdit} value={updateTitle} onChange={(e) => setUpdateTilte(e.target.value)} />
                        </span>
                        <span className={styles.formEditRight}>
                            <button onClick={(e) => handleUpdateTitle(e)}>
                                <TiTick  className="text-white w-5 h-4" />
                            </button>
                            <IoMdClose onClick={()=> setEdit(false)} className="text-white w-5 h-4" />
                        </span>
                    </form>
                }

                { !edit && (
                    <span className={styles.groupTitle}>
                        <span className={styles.titleLeft}>
                            {title ? title : t('New chat')}
                        </span>
                        <span className={styles.titleRight}>
                            <AiFillEdit onClick={() => handleEdit()} className="w-7 w-5" />
                            <BsTrash3 onClick={removeChat} className="w-7 w-7 text-white hover:text-red-700" />
                        </span>
                              
                    </span>
                )}
            </p>
            
        </Link>
    )
}

export default ChatRow
