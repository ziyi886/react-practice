import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import { List } from 'antd';
import { AlbumItem } from '../components/AlbumItem';
import { useViewport } from '../utils/useViewPort';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { PageControl } from '../components/PageControl';

type AlbumParam = {
    name: string,
    artistId: string
}

type ArtistListItem = {
    name: string
}

type Image = {
    height: number,
    width: number,
    url: string
}

type AlbumUnit = { 
    artists: ArtistListItem[],
    external_urls: {
        spotify: string
    },
    images: Image[],
    name: string,
    release_date: string,
    total_tracks: number
}

const ListWrapper = styled.div`
    width: 96%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
`;

const MainHeader = styled.div`
    position: relative;
    left: 2%;
    font-size: 25px;
`;

const SecondHeader = styled.div`
    position: relative;
    left: 2%;
    font-size: 20px;
    color: #67738a;
`;

const PageControlWrapper = styled.div`
    width: 50%;
    margin-left: auto;
    margin-right: auto;
`;

export const Albums = () => {
    const { name, artistId } = useParams<AlbumParam>();
    const [albums, setAlbums] = useState<AlbumUnit[]>([]);
    const history = useHistory();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const pageItemNum = 8;
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const searchAlbum = async (term: string) => {
        const bearer = 'Bearer ' + token;
        const offSet = page ? (page-1) * 8 : 0;
        const response = await fetch(`https://api.spotify.com/v1/artists/${term}/albums?limit=${pageItemNum}&offset=${offSet}`,
        {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        return data;
    }

    useEffect(()=>{
        
        if(!token){
            history.push(`/log-in/`)
        }else{
            const rawResult = searchAlbum(artistId);
            rawResult.then((result) => setAlbums(result?.items));
            rawResult.then((result) =>     //set page number
                setTotalPage(Math.floor(result?.total/pageItemNum) > 0 
                    ? Math.floor(result?.total/pageItemNum) 
                    : 1));
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])

    const tabletBreakPoint = 1200;
    const phoneBreakPoint = 680;
    const { width } = useViewport();
    const [ column, setColumn ] = useState(4);

    useEffect(()=>{ //self responsive related
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
        })
    }

    const handleNextPage = () => {
        setPage((page) => {
            if(page<totalPage)
                return page+1;
            return page;
        })
    }

    return (
        <>
            <MainHeader>{name}</MainHeader>
            <SecondHeader>Albums</SecondHeader>
            <ListWrapper>
                <List
                    grid={{ gutter: 16, column: column }}
                    dataSource={albums}
                    renderItem={(item: AlbumUnit) => (
                    <List.Item>
                        <AlbumItem 
                            name={item.name}
                            img={item.images[0]?.url}
                            artists={item.artists.map((artist:ArtistListItem) => artist.name)}
                            date={item.release_date}
                            track={item.total_tracks}
                            link={item.external_urls.spotify}
                        />
                    </List.Item>
                    )}
                />
            </ListWrapper>

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
