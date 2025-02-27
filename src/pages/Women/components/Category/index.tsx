// import styles from './index.module.scss'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
} from "@/components/ui/carousel"
import ThemeCard, { CardList } from '@/components/ThemeCard'

import themeCard1 from '@/assets/ThemeCard/collection-42.jpg'
import themeCard2 from '@/assets/ThemeCard/collection-43.jpg'
import themeCard3 from '@/assets/ThemeCard/collection-44.jpg'
import themeCard4 from '@/assets/ThemeCard/collection-45.jpg'
import themeCard5 from '@/assets/ThemeCard/collection-46.jpg'

const cardList: Array<CardList> = [
    { imgSrc: themeCard1, buttonName: "Tops" },
    { imgSrc: themeCard2, buttonName: "Sweatshirts" },
    { imgSrc: themeCard3, buttonName: "Swim" },
    { imgSrc: themeCard4, buttonName: "Dresses" },
    { imgSrc: themeCard5, buttonName: "Cardigans" },
]


export default function Category() {
    return (
        <div className={`px-[15px] md:px-[30px] lg:px-[50px] mt-[38px] md:mt-[64px] lg:mt-[76px]`}>
            <div className={`mb-[30px] md:mb-[50px] lg:mb-[60px] flex justify-center `}>
                <div className={`text-[22px] md:text-[32px] lg:text-[42px]`}>Categories you might like</div>
            </div>
            <SlideCard />
        </div>
    )
}

function SlideCard() {
    return (
        <div className={`flex justify-center`}>
            <Carousel className="w-full max-w-[1440px]">
                <CarouselContent className="-ml-1">
                    {
                        cardList.map((item, index) => (
                            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div className="p-1">
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