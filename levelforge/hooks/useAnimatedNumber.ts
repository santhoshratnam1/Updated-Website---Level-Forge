import { useState, useEffect, useRef } from 'react';

export const useAnimatedNumber = (
  target: number,
  duration: number = 2000,
  delay: number = 0
): number => {
  const [current, setCurrent] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
        
        // Easing function (easeOutQuart)
        const eased = 1 - Math.pow(1 - progress, 4);
        setCurrent(Math.floor(target * eased));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration, delay]);

  return current;
};