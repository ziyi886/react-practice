import React from 'react';
import { SpotifyIcon } from '../assets/icons/SpotifyIcon';
import styled from 'styled-components';

interface LoginButtonProps{
    onClick: ()=> void;
};

const IconWrapper = styled.span`
    position: relative;
    bottom: 50px;
    float: right;
    padding-right: 3px;
    padding-top: 2px;
`;

const StyledButton = styled.button`
    width: 100%;
    height: 60px;
    background-color: white;
    font-size: 25px;
    text-align: center;
    border-radius: 10px;
    border: 0.5px solid #969696;
    padding: 10px 0;
`;

export const LoginButton: React.FC<LoginButtonProps> = ({onClick}) => {

    return (
        <>
        <StyledButton onClick={onClick}>
            Login 
            
        </StyledButton>
        <IconWrapper>
            <SpotifyIcon/>
        </IconWrapper>
        </>
    )
}
