import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Separator } from '@/components/ui/separator';
export default function OrderManagement() {
    const [isOrderDetailShow, setIsOrderDetailShow] = useState(false)
    const handleOrderOnClick = (boolean: boolean) => {
        setIsOrderDetailShow(boolean)
    }
    return (
        <div className="flex flex-col justify-center items-center flex-1 m-[1em] min-w-[310px]">
            <div
                className="
                    border-2 border-[#E7E7E7] border-solid rounded-[12px] w-full flex
                    flex-col items-center max-w-[600px]
                "
            >
                {
                    !isOrderDetailShow ? (
                        <>
                            <OrderSummary handleOnClick={handleOrderOnClick}/>
                            <OrderSummary handleOnClick={handleOrderOnClick}/>
                            <OrderSummary handleOnClick={handleOrderOnClick}/>
                        </>
                    ) : (
                        <OrderOverview handleOnClick={handleOrderOnClick}/>
                    )
                }
                
            </div>
            {
                !isOrderDetailShow && (
                    <div className="my-[1.5em]">
                        <Pagination>
                            <PaginationContent>
                                <div className="flex space-x-2">
                                    <PaginationItem>
                                        <PaginationPrevious href="#"/>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#"/>
                                    </PaginationItem>
                                </div>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )
            }
        </div>
    )
}
function OrderSummary({
    handleOnClick
}: {
    handleOnClick: (boolean: boolean) => void
}) {
    return (
        <div
            className="
                flex items-center justify-between w-full px-[1.5em] py-[1.8em] gap-5
                border-b-2 border-[#E7E7E7] group last:border-none
            "
        >
            <div className="flex flex-col">
                <div
                    className="
                        rounded-[999px] flex justify-center items-center w-[50px] h-[50px]
                        overflow-hidden bg-gray-200
                    "
                >
                    <img
                        src="https://picsum.photos/600/800"
                        alt="productImgScreenShot"
                        className="w-full h-full object-cover"
                    ></img>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="">
                    <span className="font-semibold">Perchased Date: </span>
                    <span>2025/03/17</span>
                </div>
                <div className="">
                    <span className="font-semibold">Price: </span>
                    <span>$99</span>
                </div>
                <div className="">
                    <span className="font-semibold">Status: </span>
                    <span>delivering</span>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <ChevronRight size={30} className='cursor-pointer' onClick={() => handleOnClick(true)}/>
            </div>
        </div>
    )
}

function OrderOverview({
    handleOnClick
}: {
    handleOnClick: (boolean: boolean) => void
}) {
    return (
        <div className="w-full p-[1em]">
            <div className="flex items-center justify-center w-full relative">
                <div className="top-0 left-0 absolute">
                    <ChevronLeft size={30} className='cursor-pointer' onClick={() => handleOnClick(false)}/>
                </div>
                <div className="font-semibold text-[1.3em]">Order Details</div>
            </div>
            <div className="pt-[1em]">
                <div className="flex flex-col flex-1 gap-3">
                    <div className="">
                        <span className="font-semibold">Perchased Date: </span>
                        <span>2025/03/17</span>
                    </div>
                    <div className="">
                        <span className="font-semibold">Price: </span>
                        <span>$99</span>
                    </div>
                    <div className="">
                        <span className="font-semibold">Status: </span>
                        <span>delivering</span>
                    </div>
                    <Separator className="mt-3  mb-2"/>
                    <div className="font-semibold">
                        items: 
                    </div>
                    <ProductDetails />
                    <ProductDetails />
                    <ProductDetails />
                </div>
            </div>
        </div>
    )
}

function ProductDetails() {
    return (
        <div className="flex flex-col border-b-2 py-[1em] pb-[1.5em] border-[#E7E7E7] group last:border-none last:pb-0">
            <div className="flex justify-center">
                <div
                    className="
                        rounded-[999px] flex justify-center items-center w-[50px] h-[50px]
                        overflow-hidden bg-gray-200
                    "
                >
                    <img
                        src="https://picsum.photos/600/800"
                        alt="productImgScreenShot"
                        className="w-full h-full object-cover"
                        ></img>
                </div>
            </div>
            <div className="">
                Name: V-neck cotton T-shirt
            </div>
            <div className="">
                Amount: 1
            </div>
            <div className="">
                Size: M
            </div>
            <div className="">
                Color: orange
            </div>
            <div className="">
                Unit price: $20
            </div>
        </div>
    )
}
