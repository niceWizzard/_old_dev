import React, { useState, useEffect } from "react";

interface Options<T> {
    delay: number;
    delayedValue: T;
    minDuration: number;

}

export default function useDelay<T>(initial: T, { delay = 300, delayedValue, minDuration = 700 } : Options<T>) :
[T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState(initial);
    const [change, setChange] = useState(initial);
    const end = React.useRef(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let timeLeft = end.current - Date.now();
        if (change === delayedValue) {
            // create a timer to only set the state if unchanged after the delay time
            timer = setTimeout(function() {
                setState(change);
                end.current = Date.now() + minDuration; // record time that state can change again due to minDuration
            }, delay);
        } else if (timeLeft > 0) {
            // create a timer to only change the state after the minDuration
            timer = setTimeout(function() {
                setState(change);
            }, timeLeft);
        } else {
            setState(change);
        }
        // clean up
        return function() {
            timer && clearTimeout(timer); // clear any timeout
        }
    }, [change]);

    return [state, setChange];
};