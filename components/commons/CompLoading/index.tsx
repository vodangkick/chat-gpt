import './CompLoading.module.scss';
import { ImSpinner10 } from 'react-icons/im';
import styles from './CompLoading.module.scss';

export default function CompLoading() {
    return (
        <div className="items-center flex justify-center pt-2 w-full text-white">
            <ImSpinner10 className="animate-spin align-items flex-col text-white" />
        </div>
    )
}
