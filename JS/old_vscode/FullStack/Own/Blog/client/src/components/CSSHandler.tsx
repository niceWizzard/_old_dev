import { useEffect, useRef, useState } from "react";

export interface CSSHandlerProps {
    containerName: string
    classPrefix: string
    enterDelay?: number
    derenderDelay?: number
    dependency: boolean
}

const CSSHandler: React.FC<CSSHandlerProps> = ({ children, containerName, classPrefix, enterDelay = 300, dependency, derenderDelay }) => {

    const main = useRef<HTMLDivElement | null>(null);
    const [render, setRender] = useState(false)

    useEffect(() => {
        const { current: el } = main
        let addActive: any;
        let derender: any;
        if (dependency) {
            setRender(true)
            el?.classList.add(`${classPrefix}-render`)
            el?.classList.remove(`${classPrefix}-derender`)

            addActive = setTimeout(() => {
                el?.classList.remove(`${classPrefix}-derender`)
                el?.classList.add(`${classPrefix}-active`)

                derender = setTimeout(() => {
                    setRender(dependency)
                }, derenderDelay)
            }, enterDelay)
        } else {
            el?.classList.remove(`${classPrefix}-render`)
            addActive = setTimeout(() => {
                el?.classList.remove(`${classPrefix}-active`)
                el?.classList.add(`${classPrefix}-derender`)

                derender = setTimeout(() => {
                    setRender(dependency)
                }, derenderDelay)
            }, enterDelay)
        }

        return () => {
            clearTimeout(derender)
            clearTimeout(addActive)
        }
    }, [dependency, classPrefix, derenderDelay, enterDelay])

    return (
        <div ref={main} className={`${containerName}-handler`}>
            {render && children}
        </div>
    );
}

export default CSSHandler;