import './CompLoading.module.scss';
import { BiLoader } from 'react-icons/bi';
import styles from './CompLoading.module.scss';

export default function CompLoading() {
    return (
        <div className="items-center flex justify-center pt-2 w-full text-white">
            <BiLoader className="animate-spin align-items flex-col text-white" />
        </div>
    )
}
