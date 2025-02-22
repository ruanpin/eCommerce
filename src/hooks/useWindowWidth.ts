import { useState, useEffect, useCallback } from 'react';
import debounce from '@/utils/debounce.ts'

export default function useWindowWidth() {
    const [width, setWidth] = useState<number>(window.innerWidth)

    const handleResize = useCallback(debounce(() => {
        setWidth(() => window.innerWidth)
    }, 50), [])

    useEffect(() => {
        console.log('Component mounted, setting up resize listener')
        window.addEventListener("resize", handleResize)

        return () => {
            console.log('Component unmounted, cleaning up resize listener')
            window.removeEventListener("resize", handleResize)
        }
    }, [handleResize])

    // useEffect(() => {
    //     console.log('Width changed:', width);
    // }, [width]);

    return width
}