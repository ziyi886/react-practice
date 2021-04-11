import React, { useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

const SearchWrapper = styled.div`
    position: relative;
    top: 300px;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
`;

export const Search = () => {
    const history = useHistory();
    useEffect(()=>{
        const token = window.sessionStorage.getItem("token");
        if(!token || token === undefined){
            history.push(`/log-in/`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const onEnter = (content: string) => {
        history.push(`/artists/${content}`)
    }

    return (
        <SearchWrapper>
            <SearchBar initialValue="" onEnter={onEnter}/>
        </SearchWrapper>
    )
}
