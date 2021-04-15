import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { ArtistListItem } from '../components/ArtistListItem';
import { SearchBar } from '../components/SearchBar';
import { useViewport } from '../utils/useViewPort';
import { List } from 'antd';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { PageControl } from '../components/PageControl';

const ListWrapper = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
`;

const SearchWrapper = styled.div`
    width: 60%;
    position: absolute;
    top: 70px;
    left: 20%;
`;

const PageControlWrapper = styled.div`
    width: 50%;
    margin-left: auto;
    margin-right: auto;
`;

type ArtistsParam = {
    name: string,
    curPage: string
}

export const Artists = () => {
    const { name, curPage } = useParams<ArtistsParam>();
    const [artists, setArtists] = useState<any>([]);
    const history = useHistory();
    const [curSearch, setCurSearch] = useState(name);
    const cookies = new Cookies();
    const token = cookies.get('token');
    const pageItemNum = 8;
    const [page, setPage] = useState(Number(curPage));
    const [totalPage, setTotalPage] = useState(100);
    const searchPossible = async (term: string) : Promise<any> => {
        const bearer = 'Bearer ' + token;
        const offSet = page ? (page-1) * 8 : 0;
        const response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=artist&limit=${pageItemNum}&offset=${offSet}`,
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

    useEffect(()=>{
        if(!token){
            history.push(`/log-in/`)
        }else{
            history.push(`/artists/${curSearch}/${page}`)
            const artists = searchPossible(curSearch);
            artists.then((result) => setArtists(result?.items));
            artists.then((result) => 
            setTotalPage(Math.floor(result?.total/pageItemNum) > 0 
                ? Math.floor(result?.total/pageItemNum) 
                : 1));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[curSearch, page])
    
    const handleOnClick = (id: string, name: string) =>{
        history.push(`/albums/${name}/${id}`);
    }

    const onEnter = (content: string) => {
        setPage(1);
        setCurSearch(content);
    }

    const tabletBreakPoint = 1200;
    const phoneBreakPoint = 680;
    const { width } = useViewport();
    const [ column, setColumn ] = useState(4);

    useEffect(()=>{
        if(width>tabletBreakPoint){
            setColumn(4);
        }else if(width>phoneBreakPoint){
            setColumn(2);
        }else {
            setColumn(1);
        }
    }, [width]);

    const handleGoBack = () => {
        setPage((page) => {
            if(page>1){
                return page-1;
            }
            return page;
        });
        
    }

    const handleNextPage = () => {
        setPage((page) => {
            if(page<totalPage){
                return page+1;
            }   
            return page;
        });
    }

    return (
        <>
            <ListWrapper>
                
                <List
                    grid={{ gutter: 16, column: column }}
                    dataSource={artists}
                    renderItem={(item: any) => (
                    <List.Item>
                        <ArtistListItem 
                            name={item.name}
                            img={item.images[0]?.url}
                            follower={item.followers.total}
                            popularity={item.popularity}
                            onClick={()=> handleOnClick(item.id, item.name)}
                        />
                    </List.Item>
                    )}
                />
            </ListWrapper>
            <SearchWrapper>
                <SearchBar 
                    initialValue={name} 
                    onEnter={onEnter}
                    searchPossible={searchPossible}
                />
            </SearchWrapper>
            <PageControlWrapper>
                <PageControl 
                    page={page}
                    totalPage={totalPage}
                    handleGoBack={handleGoBack}
                    handleNextPage={handleNextPage}
                />
            </PageControlWrapper>
        </>
        
    )
}
