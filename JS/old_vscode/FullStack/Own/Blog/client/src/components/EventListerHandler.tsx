import { useEffect } from "react";

export interface EventListenerHandlerProps {
    Listener: () => any
    Remover: () => any
}

const EventListenerHandler: React.SFC<EventListenerHandlerProps> = ({ children, Listener, Remover }) => {

    useEffect(() => {
        Listener()
        return () => {
            Remover();
        }
    })

    return (
        <>
            {children}
        </>
    );
}

export default EventListenerHandler;