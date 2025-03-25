import ProductCard from "@/components/ProductCard"
import { MySearchInput } from '@/components/MyInput'
export default function Search() {
    return (
        <>
            <section className="py-12 px-[15px] md:px-[25px] flex justify-center">
                <SearchSection />
            </section>
            <section className="py-12 px-[15px] md:px-[25px] flex justify-center">
                <ResultSection />
            </section>
        </>
    )
}

function SearchSection() {
    const handleSearch = () => {
        console.log('search')
    }
    return (
        <div className="max-w-[1440px] flex-1">
            <MySearchInput
                className="p-3 border border-gray-300 rounded-lg h-[50px] border-solid focus:ring focus:ring-black"
                type="text"
                placeholder="Search..."
                name="search"
                autoComplete="search"
                required
                onSearchHandler={handleSearch}
            />
        </div>
    )
}

function ResultSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8 w-[100%] max-w-[1440px]">
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
        </div>
    )
}