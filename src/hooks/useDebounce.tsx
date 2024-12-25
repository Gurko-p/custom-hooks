import { useCallback, useRef } from "react";

export default function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number): (...args: Parameters<T>) => void {
    const timer = useRef<any>();

    const debouncedCallback = useCallback((...args: Parameters<T>) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedCallback;
}