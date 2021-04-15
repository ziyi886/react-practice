import React, { useState } from 'react';
import { SearchIcon } from '../assets/icons/SearchIcon';
import styled from 'styled-components';

interface SearchBarProps{
    initialValue: string;
    onEnter: (content: string)=> void;
    searchPossible: (term: string) => Promise<any>;
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

const DropDownWrapper = styled.ul`
    width: 100%;
    border: 0.5px solid #969696;
    list-style: none;
    padding-left: 0;
    background-color: white;
`;

const Option = styled.li`
    height: 40px; 
    &:hover{
        background-color: #d7d7d7;
    }
    font-size: 1rem;
    padding-left: 1%;
`;

export const SearchBar: React.FC<SearchBarProps> = ({initialValue, onEnter, searchPossible}) => {
    const [searchTerm, setSearchTerm] = useState<string>(initialValue);
    const [possibleList, setPossibleList] = useState<string[]>();

    let typingTimer: ReturnType<typeof setTimeout>;
    const doneTypingInterval = 500;

    const onKeyDown = () => {
        clearTimeout(typingTimer);
    }

    const onKeyUp = () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(()=> {
            if(searchTerm.length>0){
                const possibles = searchPossible(searchTerm);
                possibles.then((result) => setPossibleList(result?.items.map((item: any)=> item.name).slice(0,5)));
            }
        }, doneTypingInterval);
    }

    const onBlur = () => {
        setPossibleList(undefined);
    }

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
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onBlur={onBlur}
                onKeyPress={handleKeyPress}
            />
            <IconWrapper>
                <SearchIcon />
            </IconWrapper>
            {(possibleList && searchTerm.length>0) &&    
            <DropDownWrapper>
                
                {possibleList.map((possible: string, index)=>
                (
                    <Option key={index} onMouseDown={()=>{
                        setSearchTerm(possible);
                        onEnter(possible);
                        }}>
                        {possible}
                    </Option>
                ))}
                
            </DropDownWrapper>}
        </SearchWrapper>
    )
}
