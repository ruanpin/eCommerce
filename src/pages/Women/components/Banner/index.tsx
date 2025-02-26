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
// import Banner3 from '../../../../assets/Banner/women-slideshow-3.jpg'

interface BannerListObject {
    imgSrc: string,
    title: string,
    intro: string,
    buttonName: string,
}

const bannerList: Array<BannerListObject> = [
    { imgSrc: Banner1, title: "Elegance", intro: "From casual to formal, we've got you covered", buttonName: "Shop collection" },
    { imgSrc: Banner2, title: "Boutique", intro: "From casual to formal, we've got you covered", buttonName: "Shop collection" },
    { imgSrc: Banner3, title: "Elegance", intro: "From casual to formal, we've got you covered", buttonName: "Shop collection" },
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
        <div className={`relative w-full max-w-full overflow-hidden`}>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]} 
                setApi={setApi} 
                className={`w-full max-w-full`}
            >
                <CarouselContent className={`w-full max-w-full`}>
                    {
                        bannerList.map((item, index) => {
                            return (
                                <CarouselItem className={`bg-[#F7F7F7] h-[450px] w-full `} key={index}>
                                    <div className={`flex items-center relative`}>
                                        <div className={`flex flex-col absolute pl-[50px] z-20`}>
                                            <div className={`tracking-[.07em] font-normal mb-[10px] ${styles.title}`}>{item.title}</div>
                                            <div className={`text-[20px] tracking-[.04em] mb-[48px] font-medium ${styles.intro}`}>{item.intro}</div>
                                            <div className={`mb-[40px]`}>
                                                <Button text={item.buttonName}></Button>
                                            </div>
                                        </div>
                                        <div className={`flex items-center justify-center`}>
                                            {/* <AspectRatio ratio={1 / 1}> */}
                                                <img src={item.imgSrc} className={`object-cover h-[450px]`}/>
                                            {/* </AspectRatio> */}
                                        </div>
                                    </div>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <div className="mt-4 flex justify-center space-x-2 absolute bottom-0 left-0 right-0 -translate-y-10">
                    {
                        bannerList.map((item, index) => {
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