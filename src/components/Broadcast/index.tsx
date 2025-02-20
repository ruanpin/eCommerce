import { useState, useEffect } from "react";
import styles from "./index.module.scss";

interface Broadcase {
    isShowBroadcase: boolean,
    setIsShowBroadcase: (value: boolean) => void
}

export default function Broadcase({ isShowBroadcase, setIsShowBroadcase }: Broadcase) {
    const [content, setContent] = useState<string[]>([])
    // const [isMounted, setIsMounted] = useState<Boolean>(false)

    useEffect(() => {
        // 發request拿廣播list
        const mockdata: Array<string> = [
            "LIMITED TIME OFFER: FASHION SALE YOU CAN'T RESIST",
            "NEW SEASON, NEW STYLES: FASHION SALE YOU CAN'T MISS",
            "LIMITED TIME OFFER: FASHION SALE YOU CAN'T RESIST",
            "FREE SHIPPING AND RETURNS"
        ]
        setContent(mockdata)
    }, [isShowBroadcase])

    return (
        <div className={`flex items-center w-[100%] bg-[#000000] absolute top-0 left-0`}>
            <div className={`flex items-center justify-center flex-1 ${styles.marqee}`}>
                <ul>
                    {content.map((msg, index) => {
                        return <li key={index} className={`p-3 text-xs`}>{msg}</li>
                    })}
                </ul>
            </div>
            <div
                className={`
                    flex
                    items-center
                    justify-center
                    p-2
                    ml-2
                    flex-none
                    font-bold
                    text-white
                    text-md
                    cursor-pointer
                `}
                onClick={() => setIsShowBroadcase(false)}
            >
                X
            </div>
        </div>
    )
}