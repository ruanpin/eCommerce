import styles from './index.module.scss'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import ThemeCard, { ThemeCardList } from '@/components/ThemeCard'
import Button from '@/components/Button'

import themeCard1 from '@/assets/ThemeCard/collection-42.jpg'
import themeCard2 from '@/assets/ThemeCard/collection-43.jpg'
import themeCard3 from '@/assets/ThemeCard/collection-44.jpg'
import themeCard4 from '@/assets/ThemeCard/collection-45.jpg'
import themeCard5 from '@/assets/ThemeCard/collection-46.jpg'

import brickCard1 from '@/assets/BrickCard/collection-47.jpg'
import brickCard2 from '@/assets/BrickCard/collection-48.jpg'

const themeCardList: Array<ThemeCardList> = [
    { imgSrc: themeCard1, buttonName: "Tops" },
    { imgSrc: themeCard2, buttonName: "Sweatshirts" },
    { imgSrc: themeCard3, buttonName: "Swim" },
    { imgSrc: themeCard4, buttonName: "Dresses" },
    { imgSrc: themeCard5, buttonName: "Cardigans" },
]

interface BrickCardList {
    imgSrc: string,
    title: string,
    buttonName: string,
}

const brickCardList: Array<BrickCardList> = [
    { imgSrc: brickCard1, title: "The January Collection", buttonName: "Shop now" },
    { imgSrc: brickCard2, title: "Olympia's picks", buttonName: "Shop now" },
]


export default function Category() {
    return (
        <div className={`px-[15px] md:px-[30px] lg:px-[50px] mt-[38px] md:mt-[64px] lg:mt-[76px]`}>
            <div className={`mb-[30px] md:mb-[50px] lg:mb-[60px] flex justify-center `}>
                <div className={`text-[22px] md:text-[32px] lg:text-[42px] tracking-wider`}>Categories you might like</div>
            </div>
            <ScrollSection_ThemeCard />
            <ScrollSection_BrickCard />
        </div>
    )
}

function ScrollSection_ThemeCard() {
    return (
        <div className={`flex justify-center`}>
            <Carousel className={`
                    w-full max-w-[1440px] rounded-[12px]
                `}
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]} 
            >
                <CarouselContent className="-ml-1">
                    {
                        themeCardList.map((item, index) => (
                            <CarouselItem key={index} className="pl-0 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div className="p-2">
                                    <ThemeCard imgSrc={item.imgSrc} buttonName={item.buttonName}/>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
            </Carousel>
        </div>
    )
}

function ScrollSection_BrickCard() {
    return (
        <div className={`flex justify-center mt-[40px] md:mt-[46px] lg:mt-[55px]`}>
            <Carousel className={`w-full max-w-[1440px] rounded-[12px]`}>
                <CarouselContent className="-ml-1">
                    {
                        brickCardList.map((item, index) => (
                            <CarouselItem key={index} className="pl-0 md:basis-1/2">
                                <div className="p-2">
                                    <BrickCard key={index} imgSrc={item.imgSrc} title={item.title} buttonName={item.buttonName}/>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}

function BrickCard({ imgSrc, title, buttonName }: BrickCardList) {
    return (
        <div className={`flex justify-center basis-full md:basis-1/2`}>
            <div className={`w-full bg-gray-200 rounded-[12px]`}>
                <Card className={`border-0 shadow-none bg-[#EEECED] p-0 cursor-pointer ${styles.Card}`}>
                    <CardContent className={`flex aspect-square items-end justify-center p-0 relative`}>
                        <div className={`flex items-center rounded-[12px] overflow-hidden w-[100%] h-[100%]`}>
                            <img className={`
                                    object-cover rounded-[12px] w-[100%] h-[100%] ${styles.img}
                                `}
                                onContextMenu={(e) => e.preventDefault()}
                                src={imgSrc} 
                            />
                        </div>
                        <IntroSection title={title} buttonName={buttonName}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function IntroSection({ title, buttonName }: { title: string, buttonName: string }) {
    return (
        <div className={`absolute buttom-0 flex flex-col items-center z-0 pb-[30px]`}>
            <div className={`
                pb-[14px] md:pb-[22px] lg:pb-[30px] text-[18px] md:text-[20px] lg:text-[28px] text-white font-medium
            `}>{ title }</div>
            <Button
                bg_textColor_className={`bg-white text-black`}
                text={buttonName}
                textSize_className={`text-[14px]`}
                btnSize_className={`h-[40px]`}
                iconSize={18}
            />
        </div>
    )
}