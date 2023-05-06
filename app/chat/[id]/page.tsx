'use client'

import Chat from "../../../components/CompChat"
type Props = {
    params : {
        id: string
    }
}

function ChatPage({params: { id }} : Props) {
    let isLogged : any = typeof window !== 'undefined' ? localStorage.getItem('isLogin') : null
    if(isLogged) {
      isLogged = JSON.parse(isLogged);
    }

    const userName = isLogged?.username;

    return (
        <div className="flex flex-col h-screen min-w-500 w-full">
            
            <Chat chatId= {id} user={userName} />
        </div>
    )
}

export default ChatPage
