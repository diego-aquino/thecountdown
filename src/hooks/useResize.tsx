import { useEffect } from 'react';

type Callback = (event?: UIEvent) => void;

function useResize(callback: Callback): void {
  useEffect(() => {
    window.addEventListener('resize', callback);

    return () => window.removeEventListener('resize', callback);
  }, [callback]);
}

export default useResize;
