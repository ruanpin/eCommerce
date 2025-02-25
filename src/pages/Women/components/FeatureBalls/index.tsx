import styles from "./index.module.scss";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ArrowUpRight } from 'lucide-react';
import circleImg0 from '@/assets/FeatureBalls/collection-circle-8.jpg'
import circleImg1 from '@/assets/FeatureBalls/collection-circle-9.jpg'
import circleImg2 from '@/assets/FeatureBalls/collection-circle-10.jpg'
import circleImg3 from '@/assets/FeatureBalls/collection-circle-11.jpg'
import circleImg4 from '@/assets/FeatureBalls/collection-circle-12.jpg'
import circleImg5 from '@/assets/FeatureBalls/collection-circle-13.jpg'

interface FeatureTheme {
    src: string,
    title: string,
    discount: string | null,
}

const mockData: Array<FeatureTheme> = [
    { src: circleImg0, title: "New Arrivals", discount: null },
    { src: circleImg1, title: "Best Sellers", discount: null },
    { src: circleImg2, title: "Top Rated", discount: null },
    { src: circleImg3, title: "Brands We Love", discount: null },
    { src: circleImg4, title: "Trending", discount: null },
    { src: circleImg5, title: "The Re-Imagined", discount: "30" },
]

export default function FeatureBalls() {
    return (
        <div className={`${styles.container} pt-[30px] pb-[33px]`}>
            <ScrollContainer />
        </div>
    )
}

function ScrollContainer() {
    return (
        <div className={`flex items-center justify-center`}>
            <ScrollArea className="w-[96%] whitespace-nowrap rounded-md">
                <div className={`flex items-center justify-center`}>
                    {
                        mockData.map((item, index) => {
                            return <BallCard src={item.src} title={item.title} discount={item.discount} key={index}/>
                        })
                    }
                    <BallCard button={true} title="Shop all"/>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

function BallCard({ button, src, title, discount }: { button?: boolean, src?: string, title: string, discount?: string | null }) {
    return (
        <div className={`relative flex-col items-center ${styles.featureContainer}`}>
            {
                discount &&  
                <div className={`absolute`}>
                    <div className={`
                        rounded-[999px] bg-black text-white text-[12px] font-medium px-[5px] z-10 relative
                    `}>{discount}% off</div>
                </div>
            }
            <div className={`flex items-center justify-center`}>
                {
                    button === true
                    ?   (<div className={`w-[99px] h-[99px] rounded-[999px] border cursor-pointer flex items-center justify-center`}>
                            <ArrowUpRight/>
                        </div>)
                    :   (<div className={`w-[99px] h-[99px] rounded-[999px] overflow-hidden cursor-pointer`}>
                            <img src={src} className={`${styles.img}`}/>
                        </div>)
                }  
                
            </div>
            <div className={`flex items-center justify-center mt-[17px] mb-[3px]`}>
                <div className={`font-semibold text-[14px] tracking-tight cursor-pointer ${styles.titleEffect}`}>{ title }</div>
            </div>
        </div>
    )
}