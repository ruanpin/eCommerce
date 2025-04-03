import { useState, useEffect, useMemo } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Pagination from '@/components/Pagination'
import MyImg from '@/components/MyImg'
import { Separator } from '@/components/ui/separator';
import { useLazyGetOrders_memberQuery } from '@/redux/services/api'
import { Order, OrderSnapshot } from '@/redux/goodsInterfaces'
import { dateFormat } from '@/utils/dateFormat'

export default function OrderManagement() {
    const [isOrderDetailShow, setIsOrderDetailShow] = useState(false)
    const [paginationSetting, setPaginationSetting] = useState({
        page: 1,
        pageSize: 10
    })
    const [totalAmount, setTotalAmount] = useState(0)
    const [fetchOrder, { isFetching }] = useLazyGetOrders_memberQuery();
    const [orderList, setOrderList] = useState<Order[]>([])
    const [detailIndex, setDetailIndex] = useState<null | number>(null)
    const orderDetail = useMemo(() => {
        if (detailIndex !== null && typeof detailIndex === 'number') {
            return orderList[detailIndex]
        }
        return null
    }, [detailIndex, orderList])
    const handleOrderOnClick = (isShow: boolean, index: null | number) => {
        setIsOrderDetailShow(isShow)
        setDetailIndex(index)
    }
    const fetchData = async ({ page, pageSize }: { page: number, pageSize: number }) => {
        try {
            const result = await fetchOrder({ page, pageSize }).unwrap()
            const data = result?.data ?? {}

            setOrderList(() => data)
            setTotalAmount(() => result?.total ?? 0)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        fetchData(paginationSetting)
    }, [paginationSetting])
    return (
        <div className="flex flex-col justify-between items-center flex-1 m-[1em] min-w-[310px]">
            <div
                className="
                    border-2 border-[#E7E7E7] border-solid rounded-[12px] w-full flex
                    flex-col items-center max-w-[600px] 
                "
            >
                {
                    !isOrderDetailShow ? (
                        <>
                            {
                                orderList.map((order, index) => (
                                    <OrderSummary
                                        key={order.id}
                                        order={order}
                                        handleOnClick={handleOrderOnClick}
                                        index={index}
                                    />
                                ))
                            }
                        </>
                    ) : (
                        <OrderOverview
                            handleOnClick={handleOrderOnClick}
                            order={orderDetail}
                        />
                    )
                }
                
            </div>
            {
                !isOrderDetailShow && (
                    <div className="my-[1.5em]">
                        <Pagination
                            paginationSetting={paginationSetting}
                            totalPages={Math.ceil(totalAmount / paginationSetting.pageSize)}
                            // totalPages={10}
                            setPaginationSetting={setPaginationSetting}
                        />
                    </div>
                )
            }
        </div>
    )
}

function OrderSummary({
    handleOnClick,
    order,
    index
}: {
    handleOnClick: (boolean: boolean, index: null | number) => void,
    order: Order,
    index: number
}) {
    const mainImg = useMemo(() => {
        return order.snapshot?.[0].imgs?.[0]
    }, [])
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
                        overflow-hidden bg-gray-200 relative
                    "
                >
                    <MyImg imgSrc={mainImg}/>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="">
                    <span className="font-semibold">Perchased Date: </span>
                    <span>{ dateFormat(order.created_at, '-') }</span>
                </div>
                <div className="">
                    <span className="font-semibold">Price: </span>
                    <span>$ { order.total_price }</span>
                </div>
                <div className="">
                    <span className="font-semibold">Status: </span>
                    <span>{ order.status }</span>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <ChevronRight size={30} className='cursor-pointer' onClick={() => handleOnClick(true, index)}/>
            </div>
        </div>
    )
}

function OrderOverview({
    handleOnClick,
    order
}: {
    handleOnClick: (boolean: boolean, index: null | number) => void,
    order: Order | null
}) {
    if (order === null) return

    
    return (
        <div className="w-full p-[1em]">
            <div className="flex items-center justify-center w-full relative">
                <div className="top-0 left-0 absolute">
                    <ChevronLeft size={30} className='cursor-pointer' onClick={() => handleOnClick(false, null)}/>
                </div>
                <div className="font-semibold text-[1.3em]">Order Details</div>
            </div>
            <div className="pt-[1em]">
                <div className="flex flex-col flex-1 gap-3">
                    <div className="">
                        <span className="font-semibold">Perchased Date: </span>
                        <span>{dateFormat(order.created_at, '-')}</span>
                    </div>
                    <div className="">
                        <span className="font-semibold">Price: </span>
                        <span>$ { order.total_price }</span>
                    </div>
                    <div className="">
                        <span className="font-semibold">Status: </span>
                        <span>{ order.status }</span>
                    </div>
                    <Separator className="mt-3  mb-2"/>
                    <div className="font-semibold">
                        items: 
                    </div>
                    {
                        order.snapshot.map(product => (
                            <ProductDetails
                                key={product.productId}
                                product={product}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function ProductDetails({
    product,
}: {
    product: OrderSnapshot
}) {
    const mainImg = useMemo(() => {
        return product.imgs?.[0]
    }, [product.imgs])
    return (
        <div className="flex flex-col border-b-2 py-[1em] pb-[1.5em] border-[#E7E7E7] group last:border-none last:pb-0">
            <div className="flex justify-center">
                <div
                    className="
                        rounded-[999px] flex justify-center items-center w-[50px] h-[50px]
                        overflow-hidden bg-gray-200 mb-[1em]
                    "
                >
                    <MyImg imgSrc={mainImg}/>
                </div>
            </div>
            <div className="space-y-2">
                <div className="space-x-1">
                    <span className="font-semibold">
                        Name: 
                    </span>
                    <span>
                        { product.name }
                    </span>
                </div>
                <div className="space-x-1">
                    <span className="font-semibold">
                        Amount: 
                    </span>
                    <span>
                        { product.quantity }
                    </span>
                </div>
                <div className="space-x-1">
                    <span className="font-semibold">
                        Size: 
                    </span>
                    <span>
                        { product.size }
                    </span>
                </div>
                <div className="space-x-1">
                    <span className="font-semibold">
                        Color: 
                    </span>
                    <span>
                        { product.color }
                    </span>
                </div>
                <div className="space-x-1">
                    <span className="font-semibold">
                        Unit price: 
                    </span>
                    <span>
                        { product.price }
                    </span>
                </div>
            </div>
        </div>
    )
}
