import {useRef, useEffect} from "react"

const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef<() => void | null>();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        if(savedCallback && savedCallback.current) savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

export default useInterval;