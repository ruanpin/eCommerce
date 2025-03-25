import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Search } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

export default function MyInput({ className, ...props }: InputProps) {
    return (
        <Input
            className={className}
            {...props}
        />
    )
}

export function MyPasswordInput({ className, type, ...props }: InputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <div className="relative flex justify-between items-center">
            <Input
                type={showPassword ? 'text' : type}
                className={className + ' pr-[40px]'}
                {...props}
            />
            <div
                className="absolute right-4 h-[100%] flex justify-center items-center cursor-pointer"
                onClick={togglePasswordVisibility}
            >
                <div>
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </div>
            </div>
        </div>

    )
}

export function MySearchInput({ className, onSearchHandler,  ...props }: InputProps & { onSearchHandler: () => void }) {
    return (
        <div className="relative flex justify-between items-center">
            <Input
                className={className + ' pr-[40px]'}
                {...props}
            />
            <div
                className="absolute right-4 h-[100%] flex justify-center items-center cursor-pointer"
                onClick={onSearchHandler}
            >
                <div>
                    <Search size={20} />
                </div>
            </div>
        </div>

    )
}