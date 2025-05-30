import { useEffect, useState, useRef } from "react";

type ResponsiveQuery = {
    min?: number;
    max?: number;
}

type MatchMedia = ReturnType<typeof window.matchMedia>

function buildMediaQuery({ min, max }: ResponsiveQuery): string {
    const parts = [];
    if (typeof min === 'number') parts.push(`(min-width: ${min}px)`);
    if (typeof max === 'number') parts.push(`(max-width: ${max}px)`);
    
    if (!parts.length) return ""
    return parts.join(' and ');
}

export default function useMediaQueryMatch({ min, max }: ResponsiveQuery): boolean {
    const queryString = buildMediaQuery({ min, max })
    const mqlRef = useRef<MatchMedia | null>(null);

    const [matches, setMatches] = useState(() => {
        if (typeof window === 'undefined' || !queryString) return false;
        const mql = window.matchMedia(queryString);
        mqlRef.current = mql;
        return mql.matches;
    });
    const handleChange = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
    };
    useEffect(() => {
        const mql = window.matchMedia(queryString);
        if (mql.addEventListener) mql.addEventListener('change', handleChange);
        return () => {
            if (mql.removeEventListener) mql.removeEventListener('change', handleChange);
        }
    }, [queryString]);
    return matches
}