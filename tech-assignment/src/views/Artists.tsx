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
    const token = 'BQCZwBKl_K8m_-OeRU0HVKad-euLJY2-v4paknjYEKhBdg9NtEIe2HxAkjkF_iYFY0hdQAOwg95zUgMSf8mRzqzbOiiqwBwuyVLKFHhuvpeqOqTy9-jj6FBZ1ZJAtoQkp8h2_w';
    const bearer = 'Bearer ' + token;
    useEffect(()=>{
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchContent])

    const handleOnClick = (id: string, name: string) =>{
        history.push(`/albumns/${name}/${id}`);
    }

    const onEnter = (content: string) => {
        setSearchContent(content);
        history.push(`/artists/${content}`)
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
