import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
} from "@/components/ui/carousel"

interface PhotoList {
    imgSrc: string,
    alt: string,
}

const photoList: Array<PhotoList> = [
    { imgSrc: '', alt: "Olympia's picks" },
    { imgSrc: '', alt: "Olympia's picks" },
    { imgSrc: '', alt: "Olympia's picks" },
    { imgSrc: '', alt: "Olympia's picks" },
    { imgSrc: '', alt: "Olympia's picks" },
    { imgSrc: '', alt: "Olympia's picks" },
    { imgSrc: '', alt: "Olympia's picks" },
    { imgSrc: '', alt: "Olympia's picks" },
    { imgSrc: '', alt: "Olympia's picks" },
]

export default function PhotoSet() {
    return (
        <div className="flex flex-col">
            <MainPhoto />
            <SlidePhoto />
        </div>
    )
}

function MainPhoto() {
    return (
        <div className="w-full aspect-[3/4] bg-gray-300 max-w-[600px]">
            <img src="https://picsum.photos/600/800" alt="Product" className="w-full h-full object-cover" />
        </div>
    )
}

function SlidePhoto() {
    return (
        <div className="">
            <Carousel className={`w-full max-w-[600px]`}>
                <CarouselContent className="-ml-1">
                    {
                        photoList.map((_, index) => (
                            <CarouselItem key={index} className="pl-0 basis-1/3 md:basis-1/6">
                                <div className="p-2">
                                    <div className="w-full aspect-[1/1] bg-gray-300 max-w-[200px] md:max-w-[100px]">
                                        <img src="https://picsum.photos/600/800" alt="Product" className="w-full h-full object-cover" />
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