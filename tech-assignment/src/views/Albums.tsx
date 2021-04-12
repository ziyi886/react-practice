import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import { List } from 'antd';
import { AlbumItem } from '../components/AlbumItem';
import { useViewport } from '../utils/useViewPort';
import styled from 'styled-components';
import Cookies from 'universal-cookie';

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

type AlbumParam = {
    name: string,
    artistId: string
}

export const Albums = () => {
    const { name, artistId } = useParams<AlbumParam>();
    const [albums, setAlbums] = useState<any>([]);
    const history = useHistory();

    useEffect(()=>{
        const cookies = new Cookies();
        const token = cookies.get('token');
        if(!token){
            history.push(`/log-in/`)
        }else{
            const bearer = 'Bearer ' + token;
            fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`,
            {
                method: 'GET',
                headers: {
                    'Authorization': bearer,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((data) => {
                setAlbums(data.items);
            })
            .catch(console.log)
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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

    return (
        <>
            <MainHeader>{name}</MainHeader>
            <SecondHeader>Albums</SecondHeader>
            <ListWrapper>
                <List
                    grid={{ gutter: 16, column: column }}
                    dataSource={albums}
                    renderItem={(item: any) => (
                    <List.Item>
                        <AlbumItem 
                            name={item.name}
                            img={item.images[0].url}
                            artists={item.artists.map((artist:any) => artist.name)}
                            date={item.release_date}
                            track={item.total_tracks}
                            link={item.external_urls.spotify}
                        />
                    </List.Item>
                    )}
                />
            </ListWrapper>
        </>
    )
}
