import React, { useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { useHistory } from 'react-router-dom';
import { useViewport } from '../utils/useViewPort';
import styled from 'styled-components';
import Cookies from 'universal-cookie';

const SearchWrapper = styled.div`
    position: relative;
    top: 200px;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
`;

const MobileSearchWrapper = styled.div`
    position: relative;
    top: 200px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
`;

export const Search = () => {
    const history = useHistory();
    useEffect(()=>{
        const cookies = new Cookies();
        const token = cookies.get('token');
        if(!token){
            history.push(`/log-in/`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const onEnter = (content: string) => {
        history.push(`/artists/${content}`)
    }

    const { width } = useViewport();
    const breakpoint = 780;

    return width < breakpoint ? (
        <MobileSearchWrapper>
            <SearchBar initialValue="" onEnter={onEnter}/>
        </MobileSearchWrapper>
    ) : (
        <SearchWrapper>
            <SearchBar initialValue="" onEnter={onEnter}/>
        </SearchWrapper>
    );
}
