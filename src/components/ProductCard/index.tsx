import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MyImg from '@/components/MyImg' 
import { Product } from '@/redux/goodsInterfaces'

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate()
  const availableColors = useMemo(() => {
    const result = [...new Set(product.variants.map(v => (
        v.color_code
    )))]
    return result
  }, [product]);
  return (
    <div className="flex justify-center items-center cursor-pointer w-[300px] h-[450px]" onClick={() => navigate(`/productDetail/${product.id}`)}>
      <div className="flex flex-col">
        <div className="flex justify-center items-center w-[300px] overflow-hidden">
          <div className="rounded w-[300px] h-[350px] overflow-hidden relative">
            <MyImg imgSrc={product.imgs?.[0]}/>
          </div>
        </div>
        <div className="font-semibold">{product.name}</div>
        <div className="space-x-2">
          {/* <span className="line-through">$298.00</span> */}
          <span className="font-semibold">$ {product.showPrice}</span>
        </div>
        {/* <ColorPicker colors={product.variants.map(e => e.color_code)}/> */}
        <ColorPicker colors={availableColors}/>
      </div>
    </div>
  )
}
function ColorPicker({ colors }: { colors: string[] }) {
  return (
    <div className="flex items-center space-x-2">
      {
        colors.map((color_code, index) => {
          return <Color colorCode={color_code} key={index}/>
        })
      }
    </div>
  )
}
function Color({ colorCode }: { colorCode: string }) {
  const style = useMemo(() => ({ backgroundColor: colorCode }), [colorCode])
  return (
    <div className="rounded-[999px] w-[24px] h-[24px] border border-gray-400" style={style}></div>
  )
}
