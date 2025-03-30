import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard"
import { MySearchInput } from '@/components/MyInput'
import Pagination, { PaginationInterface } from "@/components/Pagination";
import {
    useLazySearchGoodsListQuery,
} from '@/redux/services/api'
import { Product } from '@/redux/goodsInterfaces'

export default function Search() {
    const [keyword, setKeyword] = useState<string>("")
    const [goodsList, setGoodsList] = useState<Product[]>([])
    const [paginationSetting, setPaginationSetting] = useState({
        page: 1,
        pageSize: 10
    })
    const [totalAmount, setTotalAmount] = useState(0)
    const [searchGoodList, { isFetching }] = useLazySearchGoodsListQuery()

    const fetchGoodList = async ({ keyword, page, pageSize }: { keyword: string, page: number, pageSize: number }) => {
        try {
          const result = await searchGoodList({ page, pageSize, keyword }).unwrap()
          const data = result?.data ?? {}
          setTotalAmount(() => result?.total ?? 0)
          setGoodsList(() => (data))
        } catch(err) {
          console.error(err)
          // toast.warning(`${JSON.stringify(err)}`)
        }
    }
    useEffect(() => {
        fetchGoodList({
            keyword,
            page: paginationSetting.page,
            pageSize: paginationSetting.pageSize,
        })
    }, [paginationSetting.page, paginationSetting.pageSize])
    return (
        <>
            <section className="py-12 px-[15px] md:px-[25px] flex justify-center">
                <SearchSection
                    keyword={keyword}
                    setKeyword={setKeyword}
                    fetchGoodList={() => {
                        fetchGoodList({
                            keyword,
                            page: paginationSetting.page,
                            pageSize: paginationSetting.pageSize,
                        })
                    }}
                    isFetching={isFetching}
                />
            </section>
            <section className="py-12 px-[15px] md:px-[25px] flex flex-col items-center justify-center">
                <ResultSection
                    goodsList={goodsList}
                    totalAmount={totalAmount}
                    paginationSetting={paginationSetting}
                    setPaginationSetting={setPaginationSetting}
                />
            </section>
        </>
    )
}

function SearchSection({
        keyword,
        setKeyword,
        fetchGoodList,
        isFetching
    }: {
        keyword: string,
        setKeyword: (value: string) => void,
        fetchGoodList: () => void,
        isFetching: boolean
    }) {
        const handleSearch = () => {
            console.log('click')
            fetchGoodList()
        };
        return (
            <div className="max-w-[1440px] flex-1">
                <MySearchInput
                    className="p-3 border border-gray-300 rounded-lg h-[50px] border-solid focus:ring focus:ring-black"
                    type="text"
                    placeholder="Search..."
                    name="search"
                    autoComplete="search"
                    required
                    onChange={(e) => { setKeyword(e.target.value); }}
                    value={keyword}
                    onSearchHandler={handleSearch}
                    isFetching={isFetching}
                />
            </div>
        )
}

function ResultSection({
    goodsList,
    totalAmount,
    paginationSetting,
    setPaginationSetting
}: {
    goodsList: Product[],
    totalAmount: number,
    paginationSetting: PaginationInterface,
    setPaginationSetting: ({ page, pageSize }: PaginationInterface) => void
}) {
    return (
        <>
            {
                goodsList.length ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 w-[100%] max-w-[1440px]">
                            {
                                goodsList.map((product) => {
                                    return <ProductCard product={product} key={product.id}/>
                                })
                            }
                        </div>
                        <div className="mt-[5rem]">
                            <Pagination
                                paginationSetting={paginationSetting}
                                totalPages={Math.ceil(totalAmount / paginationSetting.pageSize)}
                                // totalPages={10}
                                setPaginationSetting={setPaginationSetting}
                            />
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 mt-2 text-center">Sorry, no matching products were found.</p>
                )
            }
        </>
    )
}