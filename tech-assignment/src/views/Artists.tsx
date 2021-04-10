import React, { useEffect, useState } from 'react';
import { ArtistListItem } from '../components/ArtistListItem';
import { SearchBar } from '../components/SearchBar';
import { List } from 'antd';
import styled from 'styled-components';

const ListWrapper = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
`;

const SearchWrapper = styled.div`
    width: 40%;
    position: absolute;
    top: 20px;
    left: 30%;
`;

export const Artists = () => {
    const [artists, setArtists] = useState<any>([]);
    const bearer = 'Bearer ' + 'BQB1iLY3hM-YZ10LpJVXn6qAw1KkQl6AfiZBSXnUNbkLj8nlnqM8ifJbDHLlH5k3hbO_RnBLvSW5G1wPVyDs3bbPtLtf7_ISA3UpgvMDSFq1PvascWZwBiE7ScbJhUkv5YU7jw';
    useEffect(()=>{
        fetch('https://api.spotify.com/v1/search?q=tom&type=artist',
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
          setArtists(data.artists.items);
        })
        .catch(console.log)
    },[])

    const handleOnClick = (id: string) =>{
        console.log('go to '+id);
    }

    return (
        <>
            <ListWrapper>
                
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={artists}
                    renderItem={(item: any) => (
                    <List.Item>
                        <ArtistListItem 
                            name={item.name}
                            img={item.images[0].url}
                            follower={item.followers.total}
                            popularity={item.popularity}
                            onClick={()=> handleOnClick(item.id)}
                        />
                    </List.Item>
                    )}
                />
            </ListWrapper>
            <SearchWrapper>
                <SearchBar initialValue=""/>
            </SearchWrapper>
        </>
        
    )
}
