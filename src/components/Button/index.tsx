// import styles from './index.module.scss'
import { ChevronRight } from 'lucide-react';

export default function Button({ text }: {text: string}) {
    return (
        <div className={`flex`}>
            <div className={`bg-black text-white pl-[30px] pr-[25px] rounded-[999px] h-[50px] flex justify-center items-center cursor-pointer`}>
                <div className={`text-[18px] tracking-tight font-bold`}>{text}</div>
                <div className={`ml-3 font-bold`}>
                    <ChevronRight size={18} className={`stroke-3`}/>
                </div>
            </div>
        </div>
    )
}