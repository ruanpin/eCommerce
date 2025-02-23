import { memo } from 'react'
import styles from './index.module.scss'

interface NotifyNumber {
    amount: number
}

export default memo(function NotifyNumber({ amount }: NotifyNumber) {
    if (amount <= 0 || isNaN(amount)) return null
    return (
        <div className={`absolute top-[-10px] right-[-8px] flex justify-center items-center ${styles.redBall}`}>
            <div>{amount}</div>
        </div>
    )
})