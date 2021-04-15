import React from 'react';
import { useHistory } from "react-router-dom";
import { useViewport } from '../utils/useViewPort';
import styled from 'styled-components';
import Cookies from 'universal-cookie';

const CallbackWrapper = styled.div`
    position: relative;
    top: 200px;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    font-size: 1rem;
`;

const MobileCallbackWrapper = styled.div`
    position: relative;
    top: 200px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    font-size: 1rem;
`;

export const Callback = () => {
    const hash = window.location.hash.substr(1);
    const parts = hash.split('=');
    const rawToken = parts[1];
    const cookies = new Cookies();
    cookies.set('token', rawToken, { path: '/', expires: new Date(Date.now()+7200000) });
    const history = useHistory();
    setTimeout(() => {
        history.push(`/`);
      }, 3000);
    
    const { width } = useViewport();
    const breakpoint = 780;

    return (
        width < breakpoint ? (
            <MobileCallbackWrapper>Login Success! You will be redirect soon...</MobileCallbackWrapper>
        ) : (
            <CallbackWrapper>Login Success! You will be redirect soon...</CallbackWrapper>
        )
        
    )
}
