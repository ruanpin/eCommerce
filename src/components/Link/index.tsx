import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface LinkProps {
    children: ReactNode,
    href: string,
    className?: string
}

export default function Link({children, href, className}: LinkProps) {
    const navigate = useNavigate()
    return (
        <div className={className + ' cursor-pointer'} onClick={() => navigate(`${href}`)}>{children}</div>
    )
}