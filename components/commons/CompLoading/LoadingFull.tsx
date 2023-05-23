import styles from './CompLoading.module.scss'
import { ImSpinner9 } from 'react-icons/im';

export default function LoadingFull() {
    return (
        <div className={`${styles.loadingFull} fixed flex items-center justify-center bg-black w-full h-screen top-0 z-10`}>
            <ImSpinner9 className="animate-spin align-items flex-col text-white w-10 h-10" />
        </div>
    )
}