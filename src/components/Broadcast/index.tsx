import { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";

interface BroadcaseComponent {
    setIsShowBroadcase: (value: boolean) => void,
    isBroadcaseWillBeUnmounted: boolean,
    setIsBroadcaseWillBeUnmounted: (value: boolean) => void
}

export default function Broadcase({ setIsShowBroadcase, isBroadcaseWillBeUnmounted, setIsBroadcaseWillBeUnmounted }: BroadcaseComponent) {
    const [content, setContent] = useState<string[]>([])
    const broadcaseDOM = useRef<HTMLDivElement | null>(null)
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
    }, [])

    const handleClick = () => {
        broadcaseDOM?.current?.classList.add('top-[-40px]')
        setIsBroadcaseWillBeUnmounted(true)
        setTimeout(() => {
            setIsShowBroadcase(false)
        }, 2000)
    }
            

    return (
        <div className={`
                flex items-center w-[100%] bg-[#000000] absolute left-0 transition-all duration-800
                ${isBroadcaseWillBeUnmounted ? 'top-[-40px]' : 'top-0'}
            `}
            ref={broadcaseDOM}
        >
            <div className={`flex items-center justify-center flex-1 ${styles.marqee}`}>
                <ul>
                    {content.map((msg, index) => {
                        return <li key={index} className={`p-3 text-xs`}>{msg}</li>
                    })}
                </ul>
            </div>
            <div className={`
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
                onClick={() => handleClick()}
            >
                X
            </div>
        </div>
    )
}