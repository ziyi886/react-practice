import React, { useEffect, useState } from 'react';

export const Artists = () => {
    const [artists, setArtists] = useState<any>([]);
    const bearer = 'Bearer ' + 'BQB5-cH6ECsfb37WJBQv-u_L_5ysY-IP8FT0A6t5oIsl6ozW54ZKGgHjZBd-EJZlVky576Aq4DZlItwnzgA-gmzPmygU-JgF482H6gPLEIqvLTRQWms1G4uc6HLWsx6ntYVz0w';
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

    return (
        <div>
            artists list
            {
                artists.map((artist: any) =>(
                    <div>{artist.name}</div>
                ))
            }
        </div>
    )
}
