'use client';

import NewChat from '../components/CompNewChat';
import {useSelector} from 'react-redux';
import { RootState } from '../store/store';
import LanguageSwitcher from '../components/commons/CompMultiLanguage/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

// export function getStaticProps({ locale } : any) {
//     return { props: { locale } };
// }

function HomePage() {
    const userName : any = useSelector((state : RootState) => state.auth.username);
    const { t } = useTranslation();
    
    return (
        <div className="flex flex-col items-center justify-center h-screen px-2">
           <h1 className="text-3xl font-bold mb-2 text-center">{t('Welcome to ChatGPT')}</h1>
           <p className="mb-2">{t('Start asking me below.')}</p>
           <div className="flex space-x-2 items-center justify-center">
               <NewChat id="" username={userName} className="w-64" />
           </div>
        </div>
    )
}

export default HomePage
