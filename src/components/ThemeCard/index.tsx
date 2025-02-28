import { ArrowUpRight } from 'lucide-react';
import styles from './index.module.scss'
import { Card, CardContent } from "@/components/ui/card"

export interface CardList {
    imgSrc: string,
    buttonName: string,
}

export default function ThemeCard({ imgSrc, buttonName }: CardList) {
    return (
        <Card className={`border-0 shadow-none bg-[#EEECED] p-0 cursor-pointer ${styles.Card}`}>
            <CardContent className={`flex aspect-square items-end justify-center p-0`}>
                <div className={`flex items-center rounded-[12px] overflow-hidden h-[100%] `}>
                    <img className={`
                            object-cover rounded-[12px] h-[100%] ${styles.img}
                        `}
                        onContextMenu={(e) => e.preventDefault()}
                        src={imgSrc} 
                    />
                </div>
                <ButtonHoverExtend text={buttonName} />
            </CardContent>
        </Card>
    )
}

export function ButtonHoverExtend({ text }: {text: string}) {
    return (
        <div className={`flex absolute pb-[30px]`}>
            <div className={`
                    bg-white text-black pl-[30px] pr-[30px] rounded-[999px] h-[40px]
                    flex justify-center items-center cursor-pointer transition-all duration-250
                    hover:bg-black hover:text-white hover:pr-[26px] group
                `}
            >
                <div className={`text-[15px] font-medium tracking-normal `}>{text}</div>
                <div className={`
                        font-bold w-0 opacity-0 transition-all duration-300
                        group-hover:w-[20px] group-hover:opacity-100 group-hover:ml-1
                    `}
                >
                    <ArrowUpRight size={20} className={`stroke-3 stroke-white`}/>
                </div>
            </div>
        </div>
    )
}