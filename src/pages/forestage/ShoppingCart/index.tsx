import { useState, useEffect, useMemo } from 'react'
import { CircleX } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from "@/components/ui/separator"
import MyImg from '@/components/MyImg'
import QuantitySelector from '@/components/QuantitySelector'
import { CartItem } from '@/redux/goodsInterfaces'
import MyLoading from '@/components/MyLoading';

import {
    useLazySearchCart_MemberQuery,
    useChangeItemFromCart_memberMutation,
    useDeleteProductFromCart_memberMutation
} from '@/redux/services/api'

export default function ShoppingCart() {
    const [searchCart_Member] = useLazySearchCart_MemberQuery()
    const [cartList, setCartList] = useState<CartItem[]>([])
    const fetchData = async () => {
        try {
            const result = await searchCart_Member({}).unwrap();
            setCartList(result.data)
        } catch (err) {
            console.error(err)
        }
    }
    const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
    const toggleCheckbox = (id: number) => {
        setCheckedItems((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(id)) {
            newSet.delete(id)
          } else {
            newSet.add(id)
          }
          return newSet;
        });
    };
    const toggleCheckboxAll = () => {
        setCheckedItems((prev) => {
            if (prev.size === cartList.filter(e => e.price).length) {
                return new Set()
            } else {
                return cartList.reduce((newSet, element) => {
                    if (element.price!== null) {
                        newSet.add(element.id)
                    }
                    return newSet;
                }, new Set<number>())
            }
        });
    };
    const handleCheckedChange = ({ id, stopper }: { id: number, stopper: boolean }) => {
        if (stopper) return
        toggleCheckbox(id)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-[1440px] mx-auto">
            <Cart
                cartList={cartList}
                fetchData={fetchData}
                checkedItems={checkedItems}
                handleCheckedChange={handleCheckedChange}
                toggleCheckboxAll={toggleCheckboxAll}
            />
            <div>
                <OrderCheckout />
            </div>
        </div>
    )
}

function Cart({
    cartList,
    fetchData,
    checkedItems,
    handleCheckedChange,
    toggleCheckboxAll,
}: {
    cartList: CartItem[];
    fetchData: () => void;
    checkedItems: Set<number>;
    handleCheckedChange: ({ id, stopper }: { id: number, stopper: boolean }) => void;
    toggleCheckboxAll: () => void
}) {
    
    return (
        <div className="mx-[1.5em] flex flex-col gap-8 lg:col-span-2 py-[1.3em]">
            <div className="flex">
                <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        className={`
                            form-checkbox h-6 w-6 text-black border-balck rounded focus:ring-balck cursor-pointer 
                        `}
                        checked={checkedItems.size === cartList.filter(e => e.price).length}
                        onChange={() => { 
                            toggleCheckboxAll()
                        }}
                    />
                    <div>Select All</div>
                </label>
            </div>
            {
                cartList.map(e => (
                    <div className='flex items-center' key={e.id}>
                        <label className="inline-flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className={`
                                    form-checkbox h-6 w-6 text-black border-balck rounded focus:ring-balck 
                                    ${e.price === null ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'}
                                `}
                                checked={checkedItems.has(e.id)}
                                onChange={() => { 
                                    handleCheckedChange({
                                        id: e.id,
                                        stopper: e.price === null
                                    }) 
                                }}
                            />
                        </label>
                        <CartProductCard product={e} fetchData={fetchData}/>
                    </div>
                ))
            }
        </div>
    )
}

function CartProductCard({ product, fetchData }: { product: CartItem, fetchData: () => void }) {
    const [changeQuantityFromCart, {
        isLoading: isLoadingChangeQuantity
    }] = useChangeItemFromCart_memberMutation()
    const [deleteProductFromCart, {
        isLoading: isLoadingDeleteProduct
    }] = useDeleteProductFromCart_memberMutation()
    const targetSpecs = useMemo(() => {
        return product.variants.find(e => (
            product.color === e.color && product.color_code === e.color_code && product.size === e.size
        )) ?? { stock: 0 }
    }, [product.variants, product.color, product.color_code, product.size])

    const changeQuantityRequest = async(number: number) => {
        try {
            const result = await changeQuantityFromCart({
                id: product.id,
                quantity: number
            }).unwrap()
            return result
        } catch (err) {
            console.error(err)
        }
    }
    const handleQuantityChange = async(number: number) => {
        try {
            const result = await changeQuantityRequest(number)
            if (result?.status === 200) toast.success(result?.message ?? 'changed successfully')
            fetchData()
        } catch (err) {
            console.error(err)
        }
    }

    const handleDeleteProduct = async(id: number) => {
        try {
            const result = await deleteProductFromCart({ cartItem_id: id }).unwrap()
            if (result?.status === 200) toast.success(result?.message ?? 'deleted successfully')
            fetchData()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="flex justify-center items-center md:flex-row flex-col gap-8 p-[1.5em] w-full">
            <div
                className={`
                    w-[150px] h-[150px] bg-gray-200 rounded overflow-hidden relative
                    ${product.price === null && 'opacity-35'}
                `}
            >
                <MyImg imgSrc={product.imgs?.[0]}></MyImg>
            </div>  
            <div className={`flex flex-col items-center w-full`}>
                <div className='flex w-full'>
                    {
                        product.price === null && (
                            <span className="
                                    bg-gray-200 text-[#df292c] py-1 px-2 rounded whitespace-nowrap font-semibold text-[1.3em]
                                "
                            >
                                Out of stock
                            </span>
                        )
                    }
                </div>
                <div
                    className={`
                        flex flex-col items-center w-full ${product.price === null && 'opacity-35'}
                    `}
                >
                    <div className="font-semibold mb-0 w-full text-[1.3em] space-x-2">
                        <span>{ product.name }</span>
                    </div>
                    <div className='flex items-center justify-between w-full mb-6 space-x-2'>
                        <div className='space-x-2'>
                            {
                                product.color && (
                                    <span className="bg-black text-white py-1 px-2 rounded whitespace-nowrap font-semibold text-[1em]">
                                        { product.color }
                                    </span>
                                )
                            }
                            {
                                product.size && (
                                    <span className="bg-black text-white py-1 px-2 rounded whitespace-nowrap font-semibold text-[1em]">
                                        { product.size }
                                    </span>
                                )
                            }
                        </div>
                        <div>
                            <div>stock: {targetSpecs.stock}</div>
                        </div>
                    </div>
                    {/* <Separator className="my-5"/> */}
                    <div className="flex justify-between w-full">
                        <div className="font-semibold">Price:</div>
                        <div>$ {product.price}</div>
                    </div>
                    <Separator className="my-5"/>
                    <div className="flex justify-between items-center w-full">
                        <div className="font-semibold">Quantity:</div>
                        <div>
                            <QuantitySelector
                                quantity={product.quantity}
                                Stock={targetSpecs.stock}
                                setQuantity={handleQuantityChange}
                                isFetching={isLoadingChangeQuantity}
                            />
                        </div>
                    </div>
                    <Separator className="my-5"/>
                    <div className="flex justify-between w-full">
                        <div className="font-semibold">Total:</div>
                        <div className="font-semibold">$ { (product.quantity * (product?.price ?? 0)).toFixed(2) }</div>
                    </div>
                    <Separator className="my-5"/>
                </div>
                <MyLoading
                    isFetching={isLoadingDeleteProduct}
                    loadingColor="text-gray-700"
                    size="w-5 h-5"
                >
                    <div
                        className="
                            text-[#df292c] cursor-pointer flex items-center gap-x-1 font-semibold
                        "
                        onClick={() => { handleDeleteProduct(product.id) }}
                    >
                        
                        <CircleX /> REMOVE
                    </div>
                </MyLoading>
            </div>
        </div>
    )
}

function OrderCheckout() {
    return (
        <div className="m-[1.5em] flex flex-col justify-center lg:col-span-1 min-w-[300px]">
            <div className="flex flex-col space-y-4 bg-[#F7F7F7] rounded-[18px] p-[1.3em] md:p-[2em] pt-[1.3em] font-semibold">
                <div className="text-[1.8em] mb-[1.2em]">Order Summary</div>
                <div className="flex justify-between items-center">
                    <div>Subtotal</div>
                    <div>$89.99</div>
                </div>
                <Separator className=""/>
                <div className="flex justify-between items-center">
                    <div>Discounts</div>
                    <div>$20</div>
                </div>
                <Separator className=""/>
                <div className="flex justify-between items-center">
                    <div>Shipping</div>
                    <div>$0</div>
                </div>
                <Separator className=""/>
                <div className="flex justify-between items-center text-[1.5em]">
                    <div>Total</div>
                    <div>$89.99</div>
                </div>
                <div className="flex items-center space-x-2 mt-[1.8em]">
                    <input type="checkbox"></input>
                    <div>I argee with the <span className="underline">Terms and conditions</span></div>
                </div>
                <div className="">
                    <button
                        className="w-full bg-black text-white py-3 rounded-lg flex justify-center"
                        type="submit"
                    >
                        Check out
                    </button>
                </div>
            </div>
        </div>
    )
}