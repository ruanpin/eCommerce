import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard() {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center cursor-pointer " onClick={() => navigate('/productDetail')}>
      <div className="flex flex-col">
        <div className="bg-gray-400 rounded min-h-[300px] aspect-[3/4]">

        </div>
        <div className="font-semibold">Double-button trench coat</div>
        <div className="space-x-2">
          <span className="line-through">$298.00</span>
          <span className="font-semibold">$219.99</span>
        </div>
        <ColorPicker/>
      </div>
    </div>
  )
}
function ColorPicker() {
  return (
    <div className="flex items-center space-x-2">
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
