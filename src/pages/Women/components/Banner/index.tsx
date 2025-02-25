// import styles from "./index.module.scss";
import { useState, useEffect } from 'react'
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"

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
        <div>
            <Carousel 
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                setApi={setApi}
            >
                <CarouselContent>
                    <CarouselItem className={`bg-[#F7F7F7]`}>
                        pp
                    </CarouselItem>
                    <CarouselItem className={`bg-[#F7F7F7]`}>
                        oo
                    </CarouselItem>
                    <CarouselItem className={`bg-[#F7F7F7]`}>
                        mm
                    </CarouselItem>
                </CarouselContent>
                <div className="mt-4 flex justify-center space-x-2 abdolute">
                    <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" onClick={() => api?.scrollTo(0)}/>
                    <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" onClick={() => api?.scrollTo(1)}/>
                    <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" onClick={() => api?.scrollTo(2)}/>
                </div>
            </Carousel>
        </div>
    )
}