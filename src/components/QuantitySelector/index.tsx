import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center ">
        <div className="flex items-center rounded-[999px] border-gray-300 border-1">
            <div
                onClick={handleDecrement}
                className="w-8 h-8 text-xl flex justify-center items-center cursor-pointer rounded-l-[999px] hover:text-[#df292c] transition duration-300"
            >
                <Minus />
            </div>
            <span className="w-12 h-8 flex justify-center items-center">{quantity}</span>
            <div
                onClick={handleIncrement}
                className="w-8 h-8 text-xl flex justify-center items-center cursor-pointer rounded-r-[999px] hover:text-[#df292c] transition duration-300"
            >
                <Plus />
            </div>
        </div>
    </div>
  );
}
