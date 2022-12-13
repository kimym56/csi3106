import React, { useEffect } from 'react';

export function useDelayedEffect(callback: React.EffectCallback, delay: number) {
  useEffect(() => {
    let cleanup: ReturnType<React.EffectCallback>;

    const timeout = setTimeout(() => {
      cleanup = callback();
    }, delay);

    return () => {
      cleanup?.();
      clearTimeout(timeout);
    };
  }, [callback, delay]);
}
