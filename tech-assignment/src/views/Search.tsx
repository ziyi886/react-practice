import React from 'react';
import { SearchBar } from '../components/SearchBar';
import styled from 'styled-components';

const SearchWrapper = styled.div`
    position: relative;
    top: 300px;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
`;

export const Search = () => {

    return (
        <SearchWrapper>
            <SearchBar initialValue="" />
        </SearchWrapper>
    )
}
