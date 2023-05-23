'use client';

import NewChat from '../components/CompNewChat';
import {useSelector} from 'react-redux';
import { RootState } from '../store/store';

function HomePage() {
    const userName : any = useSelector((state : RootState) => state.auth.username);
    
    return (
        <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
           <h1 className="text-3xl font-bold mb-2">Welcome to ChatGPT</h1>
           <p className="mb-2">Start asking me below.</p>
           <div className="flex space-x-2 items-center justify-center">
               <NewChat id="" username={userName} className="w-64" />
           </div>
        </div>
    )
}

export default HomePage
