import React, {useEffect, useRef, useState} from 'react'
import {
    Container,
    Wrap,

} from './OffCanvas.styles'



export default function RequestDetails({show, setShow, children }) { 
    const refCont = useRef(null)
    const listener = e => {
        if (refCont && !refCont?.current?.contains(e.target)) {
            setShow(false) 
        }
    }

    useEffect(() => {
        if(show){
            window.addEventListener("click", listener)
            return () => {
                window.removeEventListener("click", listener)
            }
        }  
    }, [show ])


    return (
        <>
            <Wrap show={show}>
                <Container ref={refCont} show={show}>
                    {children}
                </Container>
            </Wrap>
        </>
    )
}
