import React from 'react';
import { SpotifyIcon } from '../assets/icons/SpotifyIcon';
import styled from 'styled-components';

interface LoginButtonProps{
    onClick: ()=> void;
};

const IconWrapper = styled.span`
    float: right;
`;

const StyledButton = styled.button`
    width: 40%; 
    height: 60px;
    margin: auto;
    display: block;
    position: relative;
    top: 300px;
    background-color: white;
    font-size: 25px;
    text-align: center;
    border-radius: 10px;
    border: 0.5px solid #969696;
    padding-top: 12px;
    padding-bottom: 12px;
`;

export const LoginButton: React.FC<LoginButtonProps> = ({onClick}) => {

    return (
        <StyledButton onClick={onClick}>
            Login 
            <IconWrapper>
                <SpotifyIcon/>
            </IconWrapper>
        </StyledButton>
    )
}
