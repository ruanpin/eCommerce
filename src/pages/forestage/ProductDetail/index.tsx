import { useMemo, useState } from 'react';
// import { Star } from 'lucide-react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner"

import { Separator } from "@/components/ui/separator"
import QuantitySelector from '@/components/QuantitySelector'
import { useSearchSpecificGoodQuery, useAddToCartMutation } from '@/redux/services/api'
import MyLoading from '@/components/MyLoading';
import { ColorSet } from '@/redux/goodsInterfaces'

import PhotoSet from './PhotoSet'

interface HandleUsersChoiceChange {
    (params: { target: string, result: string }): void;
}
interface UsersChoice {
    quantity: number;
    color: string;
    color_code: string;
    size: string;
}

export default function ProductDetail() {
    const { product_id } = useParams()
    const navigate = useNavigate();
    const { data, isLoading } = useSearchSpecificGoodQuery({ product_id })
    const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation()
    const [usersChoice, setUsersChoice] = useState({
        quantity: 1,
        color: "",
        size: "",
        color_code: ""
    })

    const handleUsersChoiceChange: HandleUsersChoiceChange = ({ target, result }) => {
        setUsersChoice(prev => ({
            ...prev,
            [target]: result
        }))
    }

    const handleQuantityChange = (quantity: number) => {
        setUsersChoice(prev => ({
            ...prev,
            quantity: quantity
        }))
    }

    const availableSizes = useMemo(() => {
        if (!usersChoice.color) return [...new Set(data?.data.variants.map(v => v.size))];
        return [...new Set(
            data?.data.variants
                .filter(v => v.color === usersChoice.color && v.stock > 0)
                .map(v => v.size)
        )];
    }, [usersChoice.color, data?.data.variants]);

    const availableColors = useMemo(() => {
        if (!usersChoice.size) {
            const set = [...new Set(data?.data.variants.map(v => (
                JSON.stringify({ color: v.color, color_code: v.color_code })
            )))]
            const result = set.map(e => JSON.parse(e))
            return result
        }
        return [...new Set(
            data?.data.variants
                .filter(v => v.size === usersChoice.size && v.stock > 0)
                .map(v => ({ color: v.color, color_code: v.color_code }))
        )];
    }, [usersChoice.size, data?.data.variants]);

    const targetStock = useMemo(() => {
        if (!usersChoice.color || !usersChoice.size) return 
        const target = data?.data.variants.find(e => (
            e.color_code === usersChoice.color_code && e.color === usersChoice.color && e.size === usersChoice.size
        ))
        handleQuantityChange(1)

        return target?.stock
    }, [usersChoice.color_code, usersChoice.color, usersChoice.size, data?.data.variants])

    const handleAddToCart = async () => {
        if (!usersChoice.color) return toast.warning(`Please select a color.`)
        if (!usersChoice.size) return toast.warning(`Please select a size.`)
        try {
            const result = await addToCart({
                productId: data?.data?.id as number,
                color: usersChoice.color,
                size: usersChoice.size,
                quantity: usersChoice.quantity
            }).unwrap();
            console.log(result, 'addToCart')
            toast.success(`${result.message}`)
            return result
        } catch (err) {
            console.error(err)
        }
    }
    const handleBuyItNow = async () => {
        try {
            const result = await handleAddToCart()
            if (typeof result === 'object' && result !== null && 'status' in result && result.status == 200) { 
                toast.success('Added to cart! Redirecting to shopping cart...');
                navigate('/shoppingCart');
            } else {
                // toast.warning('Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className={`${isLoading ? 'h-[500px] flex items-center justify-center' : ''}`}>
            <MyLoading isFetching={isLoading} loadingColor={`text-gray-400`} size="h-12 w-12">
                <section className="flat-spacing">
                    <div className="tf-main-product section-image-zoom">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                                {/* Product default */}
                                <div className="col-span-1 ">
                                    <div className="w-full flex justify-center">
                                        {/* <Slider3
                                        setActiveColor={setActiveColor}
                                        activeColor={activeColor}
                                        firstItem={product.imgSrc}
                                        /> */}
                                        <PhotoSet imgs={data?.data?.imgs}/>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="relative">
                                        <div className="text-[#A0A0A0]">{ data?.data?.category_name }</div>
                                        <div className="text-[40px] font-semibold">{ data?.data?.name }</div>
                                        {/* <div className="flex items-center mb-2">
                                            <Star size={15}/>
                                            <Star size={15}/>
                                            <Star size={15}/>
                                            <Star size={15}/>
                                            <Star size={15}/>
                                            (134 reviews)
                                        </div> */}
                                        <div className="text-[28px] font-semibold mb-2">{ data?.data?.showPrice }</div>
                                        <div>
                                            { data?.data?.description }
                                        </div>
                                        <Separator className="my-5"/>
                                        <div className="flex items-center space-x-2">
                                            <div className="font-semibold">Color:</div>
                                            <div className="">{ usersChoice.color || 'Please select a color.' }</div>
                                        </div>
                                        <div className="my-2">
                                            <ColorPicker
                                                colorSet={availableColors}
                                                handleUsersChoiceChange={handleUsersChoiceChange}
                                                usersChoice={usersChoice}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2 mt-4">
                                            <div className="font-semibold">Size:</div>
                                            <div className="">{ usersChoice.size || 'Please select a size.' }</div>
                                        </div>
                                        <div className="my-2">
                                            <SizePicker
                                                sizeSet={availableSizes}
                                                handleUsersChoiceChange={handleUsersChoiceChange}
                                                usersChoice={usersChoice}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2 mt-4">
                                            <div className="font-semibold">Quantity:</div>
                                        </div>
                                        <div className="my-2 flex items-center gap-x-2">
                                            <QuantitySelector
                                                quantity={usersChoice.quantity}
                                                Stock={targetStock}
                                                setQuantity={handleQuantityChange}
                                            />
                                            {
                                                targetStock && (
                                                    <div className="text-gray-800">Stock: {targetStock}</div>
                                                )
                                            }
                                        </div>
                                        <div className="my-3 mt-6">
                                            <button
                                                className="w-full bg-black text-white py-3 rounded-lg flex justify-center"
                                                type="submit"
                                                onClick={handleAddToCart}
                                            >
                                                {
                                                    <MyLoading
                                                        isFetching={isAddToCartLoading}
                                                        size="w-6 h-6"
                                                    >
                                                        Add to cart
                                                    </MyLoading>
                                                }
                                            </button>
                                        </div>
                                        <div className="mb-3">
                                            <button
                                                className="w-full bg-black text-white py-3 rounded-lg flex justify-center"
                                                type="submit"
                                                onClick={handleBuyItNow}
                                            >
                                                {
                                                    <MyLoading
                                                        isFetching={isAddToCartLoading}
                                                        size="w-6 h-6"
                                                    >
                                                        Buy it now
                                                    </MyLoading>
                                                }
                                            </button>
                                        </div>
                                        <div className="">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <ProductStikyBottom /> */}
                </section>
            </MyLoading>
        </div>
    )
}

function ColorPicker({
    colorSet,
    handleUsersChoiceChange,
    usersChoice
}: {
    colorSet: ColorSet[] | undefined;
    handleUsersChoiceChange: HandleUsersChoiceChange;
    usersChoice: UsersChoice;
 }) {

    if (!colorSet || colorSet.length === 0) return <p>No colors available</p>;
    return (
        <div className="flex items-center space-x-4">
            {
                colorSet.map(e => (
                    <Color
                        key={e.color_code}
                        colorCode={e.color_code}
                        color={e.color}
                        handleUsersChoiceChange={handleUsersChoiceChange}
                        usersChoice={usersChoice}
                    />
                ))
            }
        </div>
    )
}
function Color ({
    colorCode,
    color,
    handleUsersChoiceChange,
    usersChoice
}: {
    colorCode: string;
    color: string;
    handleUsersChoiceChange: HandleUsersChoiceChange;
    usersChoice: UsersChoice
}) {
  const style = useMemo(() => ({ backgroundColor: colorCode }), [colorCode])
  return (
    <div
        className={`
            rounded-[999px] w-[24px] h-[24px] cursor-pointer border-2 border-gray-300 border-solid
            hover:border-black transition duration-300
            ${usersChoice.color_code === colorCode ? 'border-black! shadow-lg' : ''}
        `}
        style={style}
        onClick={() => {
            handleUsersChoiceChange({
                target: 'color',
                result: color
            });
            handleUsersChoiceChange({
                target: 'color_code',
                result: colorCode
            })
        }}
    ></div>
  )
}

function SizePicker({
    sizeSet,
    handleUsersChoiceChange,
    usersChoice
}: {
    sizeSet: string[];
    handleUsersChoiceChange: HandleUsersChoiceChange;
    usersChoice: UsersChoice
}) {
    return (
      <div className="flex items-center space-x-4">
        {
            sizeSet.map((item, index) => (
                <Size
                    key={index}
                    sizeCode={item}
                    handleUsersChoiceChange={handleUsersChoiceChange}
                    usersChoice={usersChoice}
                />
            ))
        }
      </div>
    )
}
function Size({
    sizeCode,
    handleUsersChoiceChange,
    usersChoice
}: {
    sizeCode: string;
    handleUsersChoiceChange: HandleUsersChoiceChange;
    usersChoice: UsersChoice
}) {
return (
    <div
        className={`
            rounded-[999px] w-[32px] h-[32px] border-2 border-gray-300 flex justify-center
            items-center cursor-pointer hover:border-black transition duration-300
            ${usersChoice.size === sizeCode ? 'border-black! shadow-lg' : ''}
        `}
        onClick={() => handleUsersChoiceChange({ target: 'size', result: sizeCode })}
    >
        <div>{sizeCode}</div>
    </div>
)
}
