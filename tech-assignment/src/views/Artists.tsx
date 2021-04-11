import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
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

type ArtistsParam = {
    name: string
}

export const Artists = () => {
    const { name } = useParams<ArtistsParam>();
    const [artists, setArtists] = useState<any>([]);
    const [searchContent, setSearchContent] = useState<string>(name);
    const history = useHistory();
    
    useEffect(()=>{
        const token = window.sessionStorage.getItem("token");
        if(!token || token === undefined){
            history.push(`/log-in/`)
        }else{
            const bearer = 'Bearer ' + token;
            fetch(`https://api.spotify.com/v1/search?q=${searchContent}&type=artist`,
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
        }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchContent])

    const handleOnClick = (id: string, name: string) =>{
        history.push(`/albums/${name}/${id}`);
    }

    const onEnter = (content: string) => {
        setSearchContent(content);
        history.push(`/artists/${content}`);
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
                            onClick={()=> handleOnClick(item.id, item.name)}
                        />
                    </List.Item>
                    )}
                />
            </ListWrapper>
            <SearchWrapper>
                <SearchBar initialValue={searchContent} onEnter={onEnter}/>
            </SearchWrapper>
        </>
        
    )
}
