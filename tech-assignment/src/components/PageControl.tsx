import React from 'react';
import styled from 'styled-components';
interface PageControlProps{
    page: number;
    totalPage: number;
    handleGoBack: () => void;
    handleNextPage: () => void;
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const PageControl: React.FC<PageControlProps> = ({page, totalPage, handleGoBack, handleNextPage}) => {
    
    return (
        <Wrapper>
        <button onClick={handleGoBack}>prev</button>
            {`Page ${page}/${totalPage}`}
        <button onClick={handleNextPage}>next</button>
        </Wrapper>
    )
}
