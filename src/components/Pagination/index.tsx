import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react'
export interface PaginationInterface {
    page: number,
    pageSize: number
}

export default function PaginationComponent({
    paginationSetting,
    totalPages,
    setPaginationSetting
} : {
    paginationSetting: PaginationInterface;
    totalPages: number;
    setPaginationSetting: ({ page, pageSize }: PaginationInterface) => void;
}) {
    // const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPaginationSetting({ ...paginationSetting, page: newPage });
        }
      };

    // useEffect(() => {
    //     const pages: number[] = [];
    //     for (let i = Math.max(1, paginationSetting.page - 1); i <= Math.min(totalPages, paginationSetting.page + 1); i++) {
    //       pages.push(i);
    //     }
    //     setPageNumbers(pages);
    //   }, [paginationSetting.page, totalPages]);
    return (
        <div className="grid grid-cols-5 justify-items-center w-[100%]">
          {/* <div
            onClick={() => handlePageChange(1)}
            className={`px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 ${
                paginationSetting.page === 1 ? 'disabled:bg-gray-300 disabled:cursor-not-allowed' : ''
            }`}
          >
            &laquo; First
          </div> */}
    
          <div
            onClick={() => handlePageChange(paginationSetting.page - 1)}
            className={`
                px-3 py-1 bg-black text-white rounded cursor-pointer hover:bg-gray-800 col-start-1
                ${ paginationSetting.page === 1 ? 'opacity-25 cursor-not-allowed!' : '' }
            `}
          >
            <ChevronLeft />
          </div>
    
          {/* {
            pageNumbers.map((page) => (
                <div
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`
                        px-3 py-1 rounded cursor-pointer
                        ${ page === paginationSetting.page ? 'bg-black text-white' : 'bg-white text-gray-800 hover:bg-gray-100' }
                    `}
                >
                    {page}
                </div>
            ))
          } */}
            
            {
                paginationSetting.page !== 1 && (
                    <div className="flex justify-center items-end h-full">
                        <Ellipsis className='text-gray-500 fill-current'/>
                    </div>
                )
            }
            <div className="px-3 py-1 rounded cursor-pointer bg-black text-white col-start-3">
                {paginationSetting.page}
            </div>
            {
                paginationSetting.page !== totalPages && (
                    <div className="flex justify-center items-end h-full">
                        <Ellipsis className='text-gray-500 fill-current'/>
                    </div>
                )
            }
    
          <div
            onClick={() => handlePageChange(paginationSetting.page + 1)}
            className={`
                px-3 py-1 bg-black text-white rounded cursor-pointer hover:bg-gray-800 col-start-5
                ${ paginationSetting.page === totalPages ? 'opacity-25 cursor-not-allowed!' : '' } 
            `}
          >
            <ChevronRight />
          </div>
    
          {/* <div
            onClick={() => handlePageChange(totalPages)}
            className={`px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 ${
                paginationSetting.page === totalPages ? 'disabled:bg-gray-300 disabled:cursor-not-allowed' : ''
            }`}
          >
            Last &raquo;
          </div> */}
        </div>
      );
}