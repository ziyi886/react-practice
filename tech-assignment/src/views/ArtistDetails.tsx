import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import { AlbumItem } from '../components/AlbumItem';
import styled from 'styled-components';

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

export const ArtistDetails = () => {
    const [albums, setAlbums] = useState<any>([]);
    const bearer = 'Bearer ' + 'BQB5-cH6ECsfb37WJBQv-u_L_5ysY-IP8FT0A6t5oIsl6ozW54ZKGgHjZBd-EJZlVky576Aq4DZlItwnzgA-gmzPmygU-JgF482H6gPLEIqvLTRQWms1G4uc6HLWsx6ntYVz0w';
    useEffect(()=>{
        fetch('https://api.spotify.com/v1/artists/74NBPbyyftqJ4SpDZ4c1Ed/albums',
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
    },[])

    return (
        <>
            <MainHeader>Tom Petty</MainHeader>
            <SecondHeader>Albums</SecondHeader>
            <ListWrapper>
                <List
                    grid={{ gutter: 16, column: 4 }}
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
