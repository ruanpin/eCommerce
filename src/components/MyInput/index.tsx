import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
    type: string,
    name: string,
    autoComplete?: string,
    required?: boolean,
    placeholder?: string,
    className?: string
}

export default function MyInput({ type, name, autoComplete, required, placeholder, className }: InputProps) {
    return (
        <Input
            type={type}
            name={name}
            autoComplete={autoComplete}
            required={required}
            placeholder={placeholder}
            className={className}
        />
    )
}

export function MyPasswordInput({ type, name, autoComplete, required, placeholder, className }: InputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <div className="relative">
            <Input
                type={showPassword ? 'text' : type}
                name={name}
                required={required}
                placeholder={placeholder}
                className={className}
                autoComplete={autoComplete}
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