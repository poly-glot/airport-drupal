'use client';

import { useEffect, useRef } from 'react';

type Enhancer<T> = (element: T) => void;

const enhancedBy = new WeakMap<Enhancer<never>, WeakSet<Element>>();

function once<T extends Element>(enhancer: Enhancer<T>, element: T) {
    const seen = enhancedBy.get(enhancer) ?? new WeakSet<Element>();
    enhancedBy.set(enhancer, seen);

    if (seen.has(element)) {
        return;
    }

    seen.add(element);
    enhancer(element);
}

export function useEnhance<T extends HTMLElement>(...enhancers: Enhancer<T>[]) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        enhancers.forEach((enhancer) => once(enhancer, element));
    });

    return ref;
}
