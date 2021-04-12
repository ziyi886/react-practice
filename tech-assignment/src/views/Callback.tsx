import React from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

const CallbackWrapper = styled.div`
    position: relative;
    top: 200px;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    font-size: 1rem;
`;

export const Callback = () => {
    const hash = window.location.hash.substr(1);
    const parts = hash.split('=');
    const rawToken = parts[1];
    window.sessionStorage.setItem("token", rawToken);
    const history = useHistory();
    setTimeout(() => {
        history.push(`/`);
      }, 3000);
    

    return (
        <CallbackWrapper>Login Success! You will be redirect soon...</CallbackWrapper>
    )
}
