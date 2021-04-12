import React from 'react';
import { LoginButton } from '../components/LoginButton';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    position: relative;
    top: 200px;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
`;

export const Login = () => {
    const authEndpoint = `https://accounts.spotify.com/authorize`;
    const clientID = `e94b6c15e07347df911d3b51df8b94d1`;
    const redirectUrl = encodeURI(`http://localhost:3000/callback`);

    const onClick =() =>{
        window.location.href=`${authEndpoint}?client_id=${clientID}&response_type=token&redirect_uri=${redirectUrl}&scope=user-read-private%20user-read-email`;
    }
    return (
        <ButtonWrapper>
            <LoginButton onClick={onClick}/>
        </ButtonWrapper>
    )
}
