import React from 'react';
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
    const cookies = new Cookies();
    const token = cookies.get('token');
    if(!token){
        history.push(`/log-in/`)
    }

    const onEnter = (content: string) => {
        history.push(`/artists/${content}`)
    }

    const { width } = useViewport();
    const breakpoint = 780;

    const searchPossible = async (term: string) : Promise<string[]> => {
        const bearer = 'Bearer ' + token;
        const response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=artist`,
        {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        return data.artists;
    }

    return width < breakpoint ? (
        <MobileSearchWrapper>
            <SearchBar 
                initialValue="" 
                onEnter={onEnter}
                searchPossible={searchPossible}
            />
        </MobileSearchWrapper>
    ) : (
        <SearchWrapper>
            <SearchBar 
                initialValue="" 
                onEnter={onEnter}
                searchPossible={searchPossible}
            />
        </SearchWrapper>
    );
}
