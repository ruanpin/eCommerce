import { Separator } from "@/components/ui/separator"
import QuantitySelector from '@/components/QuantitySelector'
import { CircleX } from 'lucide-react';
export default function ShoppingCart() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3">
            <Cart />
            <OrderCheckout />
        </div>
    )
}

function Cart() {
    return (
        <div className="mx-[1.5em] flex flex-col gap-8 lg:col-span-2 py-[1.3em]">
            <CartProductCard />
            <Separator className="my-5"/>
            <CartProductCard />
        </div>
    )
}

function CartProductCard() {
    return (
        <div className="flex justify-center items-center md:flex-row flex-col gap-8 p-[1.5em] w-full">
            <div className="w-[150px] h-[150px] bg-gray-200 rounded overflow-hidden">
                <img src="https://picsum.photos/600/800" alt="Product" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center w-full">
                <div className="font-semibold mb-6 w-full text-[1.3em]">
                    Ramie shirt with pockets
                </div>
                {/* <Separator className="my-5"/> */}
                <div className="flex justify-between w-full">
                    <div className="font-semibold">Price:</div>
                    <div>$20</div>
                </div>
                <Separator className="my-5"/>
                <div className="flex justify-between items-center w-full">
                    <div className="font-semibold">Quantity:</div>
                    <div>
                        <QuantitySelector />
                    </div>
                </div>
                <Separator className="my-5"/>
                <div className="flex justify-between w-full">
                    <div className="font-semibold">Total:</div>
                    <div className="font-semibold">$20</div>
                </div>
                <Separator className="my-5"/>
                <div className="text-[#df292c] cursor-pointer flex items-center gap-x-1">
                    <CircleX /> REMOVE
                </div>
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