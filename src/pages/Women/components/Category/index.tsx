// import styles from './index.module.scss'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
} from "@/components/ui/carousel"

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
            <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-2xl font-semibold">{index + 1}</span>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
            </Carousel>
        </div>
    )
}