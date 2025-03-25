import { Star } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { useMemo } from 'react';
import QuantitySelector from '@/components/QuantitySelector'
import PhotoSet from './PhotoSet'

export default function ProductDetail() {
    return (
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
                                <PhotoSet />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="relative">
                                <div className="text-[#A0A0A0]">Clothing</div>
                                <div className="text-[40px] font-semibold">V-neck cotton T-shirt</div>
                                <div className="flex items-center mb-2">
                                    <Star size={15}/>
                                    <Star size={15}/>
                                    <Star size={15}/>
                                    <Star size={15}/>
                                    <Star size={15}/>
                                    (134 reviews)
                                </div>
                                <div className="text-[28px] font-semibold mb-2">$59.99</div>
                                <div>
                                    The garments labelled as Committed are products that have been produced using sustainable fibres or processes, reducing their environmental impact.
                                </div>
                                <Separator className="my-5"/>
                                <div className="flex items-center space-x-2">
                                    <div>Color:</div>
                                    <div className="font-semibold">Gray</div>
                                </div>
                                <div className="my-2">
                                    <ColorPicker />
                                </div>
                                <div className="flex items-center space-x-2 mt-4">
                                    <div>Size:</div>
                                    <div className="font-semibold">md</div>
                                </div>
                                <div className="my-2">
                                    <SizePicker />
                                </div>
                                <div className="flex items-center space-x-2 mt-4">
                                    <div>Quantity:</div>
                                </div>
                                <div className="my-2">
                                    <QuantitySelector />
                                </div>
                                <div className="my-3 mt-6">
                                    <button
                                        className="w-full bg-black text-white py-3 rounded-lg flex justify-center"
                                        type="submit"
                                    >
                                        Add to cart
                                    </button>
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="w-full bg-black text-white py-3 rounded-lg flex justify-center"
                                        type="submit"
                                    >
                                        Buy it now
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
    )
}

function ColorPicker() {
  return (
    <div className="flex items-center space-x-4">
      <Color colorCode="#F56565"/>
      <Color colorCode="#CEA050"/>
      <Color colorCode="#5F8DF3"/>
    </div>
  )
}
function Color({ colorCode }: { colorCode: string }) {
  const style = useMemo(() => ({ backgroundColor: colorCode }), [colorCode])
  return (
    <div className="rounded-[999px] w-[24px] h-[24px]" style={style}></div>
  )
}

function SizePicker() {
    return (
      <div className="flex items-center space-x-4">
        <Size sizeCode="XS"/>
        <Size sizeCode="S"/>
        <Size sizeCode="M"/>
        <Size sizeCode="L"/>
        <Size sizeCode="XL"/>
      </div>
    )
}
function Size({ sizeCode }: { sizeCode: string }) {
return (
    <div
        className="
            rounded-[999px] w-[32px] h-[32px] border-2 border-gray-300 flex justify-center
            items-center cursor-pointer hover:border-black transition duration-300
        "
    >
        <div>{sizeCode}</div>
    </div>
)
}
