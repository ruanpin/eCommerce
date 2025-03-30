import { Loader2 } from 'lucide-react';
export default function Loading({ size = 'w-9 h-9', color = 'text-white' }) {
    return (
        <div className="flex items-center justify-center h-[100%]">
            <Loader2 className={`animate-spin ${color} ${size}`} />
            {/* <span className="pl-2 text-[1rem] text-gray-500"></span> */}
        </div>
    );
}