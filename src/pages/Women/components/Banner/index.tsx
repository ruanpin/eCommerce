import styles from "./index.module.scss";
import { useState, useEffect } from 'react'
import Autoplay from "embla-carousel-autoplay"
import Button from '@/components/Button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Banner1 from '@/assets/Banner/women-slideshow-1.jpg'
import Banner2 from '@/assets/Banner/women-slideshow-2.jpg'
import Banner3 from '@/assets/Banner/women-slideshow-3.jpg'
import Banner1_mb from '@/assets/Banner/women-slideshow-1_mb.jpg'
import Banner2_mb from '@/assets/Banner/women-slideshow-2_mb.jpg'
import Banner3_mb from '@/assets/Banner/women-slideshow-3_mb.jpg'
// import Banner3 from '../../../../assets/Banner/women-slideshow-3.jpg'

interface BannerListObject {
    imgSrc: string,
    imgSrc_mb: string,
    title: string,
    intro: string,
    buttonName: string,
}

const bannerList: Array<BannerListObject> = [
    { imgSrc: Banner1, imgSrc_mb: Banner1_mb, title: "Elegance", intro: "From casual to formal, we've got you covered", buttonName: "Shop collection" },
    { imgSrc: Banner2, imgSrc_mb: Banner2_mb, title: "Boutique", intro: "From casual to formal, we've got you covered", buttonName: "Shop collection" },
    { imgSrc: Banner3, imgSrc_mb: Banner3_mb, title: "Elegance", intro: "From casual to formal, we've got you covered", buttonName: "Shop collection" },
]

export default function Banner() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    console.log(count, current)

    useEffect(() => {
        if (!api) {
            return
        }
        
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
        
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    return (
        <div className={`relative w-full`}>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]} 
                setApi={setApi} 
                className={`w-full`}
            >
                <CarouselContent className={``}>
                    {
                        bannerList.map((item, index) => {
                            return (
                                <CarouselItem className={`bg-[#F7F7F7] h-[450px] w-full flex justify-center items-center`} key={index}>
                                    <div className={`flex items-center flex-row-reverse relative w-full`}>
                                        <div className={`flex flex-col absolute left-0 pl-[30px] md:pl-[50px] z-20`}>
                                            <div className={`
                                                    tracking-[.07em] font-normal mb-[15px] md:mb-[10px] ${styles.title}
                                                    transition-all duration-1000 delay-300 transform
                                                    ${(index + 1) === current ? 'translate-y-[0px] opacity-100' : 'translate-y-[250px] opacity-0'}
                                                `}
                                            >{item.title}</div>
                                            <div className={`
                                                    text-[20px] tracking-[.04em] mb-[48px] font-medium ${styles.intro}
                                                    transition-all duration-1000 delay-350 transform
                                                    ${(index + 1) === current ? 'translate-y-[0px] opacity-100' : 'translate-y-[250px] opacity-0'}
                                                `}>{item.intro}</div>
                                            <div className={`
                                                    mb-[40px] transition-all duration-1000 delay-500 transform
                                                    ${(index + 1) === current ? 'translate-y-[0px] opacity-100' : 'translate-y-[250px] opacity-0'}
                                                `}>
                                                <Button text={item.buttonName}></Button>
                                            </div>
                                        </div>
                                        <div className={`flex items-center`}>
                                            <picture>
                                                <source srcSet={item.imgSrc_mb} media="(max-width: 765px)" />
                                                <img onContextMenu={(e) => e.preventDefault()} src={item.imgSrc} className={`object-cover h-[450px]`} />
                                            </picture>
                                        </div>
                                    </div>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <div className="mt-4 flex justify-center space-x-2 absolute bottom-0 left-0 right-0 -translate-y-10">
                    {
                        bannerList.map((_, index) => {
                            return (
                                <div className={`
                                        w-[22px] h-[22px] p-md bg-gray-300 cursor-pointer rounded-[999px] flex justify-center items-center
                                        ${(index + 1) === current ? ' bg-gray-300' : 'bg-transparent'}
                                    `}
                                    onClick={() => api?.scrollTo(index)}
                                    key={index}
                                >
                                    <div className="h-[6px] w-[6px] rounded-full bg-black dark:bg-gray-600"/>
                                </div>
                            )
                        })
                    }
                </div>
            </Carousel>
        </div>
    )
}