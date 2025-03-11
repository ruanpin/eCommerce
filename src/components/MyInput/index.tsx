import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react";

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
        <div className="relative">
            <Input
                type={showPassword ? 'text' : type}
                className={className}
                {...props}
            />
            <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
        </div>

    )
}