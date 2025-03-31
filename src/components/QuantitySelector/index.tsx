import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  quantity,
  Stock,
  setQuantity
}: {
  quantity: number;
  Stock: number | undefined;
  setQuantity: (quantity: number) => void
}) {

  const handleDecrement = () => {
    if (Stock === undefined) return
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (Stock === undefined) return
    if (Number(Stock) <= quantity) return
    setQuantity(quantity + 1);
  };

  return (
    <div className={`flex items-center ${!Stock && 'opacity-30 cursor-not-allowed!'}`}>
        <div className="flex items-center rounded-[999px] border-gray-300 border-1">
            <div
                onClick={handleDecrement}
                className={`
                  w-8 h-8 text-xl flex justify-center items-center 
                  rounded-l-[999px] transition duration-300
                  ${!Stock ? 'cursor-not-allowed' : 'cursor-pointer hover:text-[#df292c]'}
                `}
            >
                <Minus />
            </div>
            <span className="w-12 h-8 flex justify-center items-center">{ quantity }</span>
            <div
                onClick={handleIncrement}
                className={`
                  w-8 h-8 text-xl flex justify-center items-center
                  rounded-r-[999px] transition duration-300
                  ${!Stock ? 'cursor-not-allowed' : 'cursor-pointer hover:text-[#df292c]'}
                `}
            >
                <Plus />
            </div>
        </div>
    </div>
  );
}
