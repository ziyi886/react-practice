import React, { useState } from 'react';
import { SearchIcon } from '../assets/icons/SearchIcon';
import styled from 'styled-components';

interface SearchBarProps{
    initialValue: string;
    onEnter: (content: string)=> void;
}

const SearchWrapper = styled.div`
    height: 60px;
    
`;

const StyledInput = styled.input`
    width: 100%; 
    height: 60px;
    background-color: white;
    font-size: 25px;
    text-align: center;
    border-radius: 10px;
    border: 0.5px solid #969696;
    padding-top: 12px;
    padding-bottom: 12px;
`;

const IconWrapper = styled.span`
    position: relative;
    bottom: 50px;
    float: right;
    padding-right: 5px;
`;

export const SearchBar: React.FC<SearchBarProps> = ({initialValue, onEnter}) => {
    const [searchTerm, setSearchTerm] = useState<string>(initialValue);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setSearchTerm(e.target.value);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onEnter(e.currentTarget.value as string);
        }
    }

    return (
        <SearchWrapper>
            <StyledInput
                type="text"
                placeholder="Search for an artist..."
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <IconWrapper>
                <SearchIcon />
            </IconWrapper>
        </SearchWrapper>
    )
}
