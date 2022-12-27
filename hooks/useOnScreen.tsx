import { RefObject, useEffect, useRef, useState } from "react";

export default function useOnScreen(ref: RefObject<HTMLElement>, defBool: boolean) {
    const [isIntersecting, setIntersecting] = useState(defBool);
    const obverserRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        obverserRef.current = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))
    }, [])

    useEffect(() => {
        if (ref.current) obverserRef.current?.observe(ref.current);

        return () => {
            if (ref.current) obverserRef.current?.unobserve(ref.current)
        }
    }, [ref])

    return isIntersecting;
}