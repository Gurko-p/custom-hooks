import { useEffect, useRef } from "react";

export default function useScroll(
    parentRef: React.RefObject<HTMLElement>,
    childRef: React.RefObject<HTMLElement>,
    callback: () => void
): void {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const options: IntersectionObserverInit = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 0
        };

        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                console.log('intersected');
                callback();
            }
        }, options);

        if (childRef.current) {
            observer.current.observe(childRef.current);
        }

        return () => {
            if (childRef.current && observer.current) {
                observer.current.unobserve(childRef.current);
            }
        };
    }, [callback, parentRef, childRef]);
}
