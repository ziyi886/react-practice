import React from 'react';

interface PageControlProps{
    page: number;
    totalPage: number;
    handleGoBack: () => void;
    handleNextPage: () => void;
}

export const PageControl: React.FC<PageControlProps> = ({page, totalPage, handleGoBack, handleNextPage}) => {
    
    return (
        <>
        <button onClick={handleGoBack}>prev</button>
            {`Page ${page}/${totalPage}`}
        <button onClick={handleNextPage}>next</button>
        </>
    )
}
