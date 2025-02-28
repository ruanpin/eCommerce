import styles from './index.module.scss'
import { ChevronRight } from 'lucide-react';

export default function Button({ bg_textColor_className, text, textSize_className, btnSize_className, iconSize, icon }: {bg_textColor_className: string, text: string, textSize_className: string, btnSize_className: string, iconSize: number, icon?: string}) {
    return (
        <div className={`flex relative ${styles.glowOnHover}`}>
            <div className={`
                    rounded-[999px] flex justify-center items-center cursor-pointer
                    ${btnSize_className} ${bg_textColor_className}
                    ${icon ? `pl-[30px] pr-[25px]` : `px-[30px]`}
                `}
            >
                <div className={`tracking-tight font-bold -translate-y-[1px] ${textSize_className}`}>{text}</div>
                {
                    icon &&
                    <div className={`ml-3 font-bold`}>
                        <ChevronRight size={iconSize} className={`stroke-3`}/>
                    </div>
                }
            </div>
        </div>
    )
}