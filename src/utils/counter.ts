import { useEffect, useState } from 'react';

export function useCountUp(
  target: number,
  duration = 2000,
  decimals = 0,
  shouldStart = true
): string {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smooth easeOutExpo curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * target;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, shouldStart]);

  return count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
