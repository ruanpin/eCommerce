import { Minus, Plus } from 'lucide-react';
// import MyLoading from '@/components/MyLoading';

export default function QuantitySelector({
  quantity,
  Stock,
  setQuantity,
  isFetching = false
}: {
  quantity: number;
  Stock: number | undefined;
  setQuantity: (quantity: number) => void,
  isFetching: boolean
}) {

  const handleDecrement = () => {
    if (!Stock) return
    if (isFetching) return
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (!Stock) return
    if (isFetching) return
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
              {/* <MyLoading isFetching={isFetching} loadingColor="text-gray-700" size="w-5 h-5"> */}
                <Minus />
              {/* </MyLoading> */}
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
              {/* <MyLoading isFetching={isFetching} loadingColor="text-gray-700" size="w-5 h-5"> */}
                <Plus />
              {/* </MyLoading> */}
            </div>
        </div>
    </div>
  );
}
