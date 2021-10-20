import React, { useEffect } from 'react' 
import { Container, Wraper } from '../globalStyles'
import { useState } from 'react'
import GlobalStyle from "../globalStyles";
 
import AlertComponent from '../components/Alert/AlertComponent'

import styled from 'styled-components'


export default function Layout({children}) {
     return (
        <>
            <GlobalStyle   />
            < AlertComponent />

            <Wraper>
                 
                <Container   >
                   <Content >
                        {children}
                    </Content>
                </Container>
            </Wraper>
        </>
    )
}


const Content = styled.div`
    width: 96%;
    margin: 30px 0px;
`