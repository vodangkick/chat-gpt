'use client'

import Chat from "../../../components/CompChat"
type Props = {
    params : {
        id: string
    }
}

function ChatPage({params: { id }} : Props) {
    return (
        <div className="flex flex-col h-screen min-w-500 w-full">
            <Chat chatId= {id} />
        </div>
    )
}

export default ChatPage
