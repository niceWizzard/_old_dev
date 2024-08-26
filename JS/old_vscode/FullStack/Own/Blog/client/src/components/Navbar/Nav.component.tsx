


import React, { useContext, useEffect, useRef, useState } from 'react';
import { WINDOWContext } from '../Contexts';
import CSSHandler from '../CSSHandler';
import NavSide from './NavSide.component';
import EventListenerHandler from '../EventListerHandler';
import NavUpper from './Nav.upper';

export interface NavProps {
    urlLocation: string
    windowSize: number
    brandName: string
}




const Nav: React.FC<NavProps> = ({ urlLocation, brandName }) => {


    const [navOpen, setNavOpen] = useState(false);

    const [isScrollingDown, setIsScrollingDown] = useState(false)
    const prevScroll = useRef<number>(0)


    const windowSize = useContext(WINDOWContext)

    useEffect(() => {

        function hey() {
            const scrollTop = document.documentElement.scrollTop
            setIsScrollingDown(prevScroll.current < scrollTop)
            prevScroll.current = scrollTop
        }
        windowSize <= 650 && window.addEventListener('scroll', hey)

        return () => {
            windowSize <= 650 && window.removeEventListener('scroll', hey)
        }
    }, [windowSize])



    const getSideNavClass = () => {
        return isScrollingDown ? 'side mobile hide ' : 'side mobile'
    }





    function hello(e: any) {
        const valids = ['navlinks', 'navlink', 'navlink-text']
        const results = valids.map(valid => e.target.classList.contains(valid))
        if (!results.includes(true)) {
            setNavOpen(false)
        }
    }



    return (
        <>
            <header  >
                <div
                    className={windowSize <= 650 ? 'container mobile-nav' : 'container '}
                >

                    <NavUpper setNavOpen={setNavOpen} brandName="BlogIt" navOpen={navOpen} />

                    {windowSize > 650 ? <CSSHandler dependency={navOpen} containerName="sidenav" classPrefix="navside" enterDelay={100} derenderDelay={400} >
                        <EventListenerHandler
                            Listener={() => {
                                window.addEventListener('click', hello)
                            }}
                            Remover={() => window.removeEventListener('click', hello)}
                        >
                            <NavSide urlLocation={urlLocation} setNavOpen={setNavOpen} navClass="side" />

                        </EventListenerHandler>
                    </CSSHandler> :
                        <NavSide urlLocation={urlLocation} setNavOpen={setNavOpen} navClass={getSideNavClass()} />

                    }
                </div>
            </header >


        </>
    );
}

export default Nav;