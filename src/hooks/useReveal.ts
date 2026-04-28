import { useEffect, useRef, useState } from 'react';

// Reveals an element once it enters the viewport, using IntersectionObserver.
// Add `ref` to the element and merge `className` into its className. The
// element starts with translate/blur/opacity offsets and animates back to
// rest when it intersects. Honors prefers-reduced-motion via the global CSS
// definition of `.reveal-init` in src/index.css.
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    inView,
    className: `reveal-init${inView ? ' in-view' : ''}`,
  };
}
