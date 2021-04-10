import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { List, Card } from 'antd';

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
        <div>
            artists details
            {
                albums.map((album: any) =>(
                    <div>{album.name}</div>
                ))
            }
        </div>
    )
}
