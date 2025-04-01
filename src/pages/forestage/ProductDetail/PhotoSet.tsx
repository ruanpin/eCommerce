import { useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
} from "@/components/ui/carousel"
import MyImg from '@/components/MyImg' 

interface Imgs {
    imgs: string[] | undefined,
}

export default function PhotoSet({ imgs }: Imgs) {
    const[imgIndex, setImgIndex] = useState(0)
    return (
        <div className="flex flex-col">
            <MainPhoto imgs={imgs} imgIndex={imgIndex}/>
            <SlidePhoto imgs={imgs} setImgIndex={setImgIndex}/>
        </div>
    )
}

function MainPhoto({ imgs, imgIndex }: Imgs & { imgIndex: number }) {
    return (
        <div className="w-full aspect-[3/4] bg-gray-300 max-w-[600px] w-[100%] md:w-[350px] lg:w-[500px] h-[500px] md:h-[466px] lg:h-[666px] relative">
            {/* <img src={`${imgs?.[imgIndex]}`} alt="Product" className="w-full h-full object-cover" /> */}
            {/* <div>
                
            </div> */}
            <MyImg imgSrc={imgs?.[imgIndex] as string}/>
        </div>
    )
}

function SlidePhoto({ imgs, setImgIndex }: Imgs & { setImgIndex: (params: number) => void }) {
    return (
        <div className="">
            <Carousel className={`w-full max-w-[600px]`}>
                <CarouselContent className="-ml-1">
                    {
                        imgs?.map((src, index) => (
                            <CarouselItem key={index} className="pl-0 basis-1/3 md:basis-1/6">
                                <div className="p-2" onClick={() => setImgIndex(index)}>
                                    <div className="w-full aspect-[1/1] bg-gray-300 max-w-[200px] md:max-w-[100px] cursor-pointer">
                                        <img src={src} alt="Product" className="w-full h-full object-cover"/>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}