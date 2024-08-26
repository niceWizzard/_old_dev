import { useState } from "react";

export default function useThrottle(cb: () => void, msTimeout: number) {
    const [canCall, setCanCall] = useState(true);

    let isCancelled = false;
    let timeoutId: NodeJS.Timeout | null;

    const cancel = () => {
        timeoutId && clearTimeout(timeoutId);
        isCancelled = true;
    }

    function callCb() {
        if(isCancelled || !canCall) {return;}
        cb();
        setCanCall(false);
        timeoutId = setTimeout(() => {
            setCanCall(true);
        }, msTimeout);
    }

    return [callCb, cancel];
}
