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
        <div className={`px-[15px] md:px-[30px] lg:px-[50px] mt-[40px] md:mt-[66px] lg:mt-[78px]`}>
            <div className={`mb-[30px] md:mb-[50px] lg:mb-[60px] flex justify-center items-center flex-col`}>
                <div className={`text-[22px] md:text-[32px] lg:text-[42px] tracking-wider`}>Ecomus’s Favorites</div>
                <div className={`text-[16px] tracking-wider text-center mt-[12px]`}>Beautifully Functional. Purposefully Designed. Consciously Crafted.</div>
            </div>
            <ScrollSection />
        </div>
    )
}

function ScrollSection() {
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
