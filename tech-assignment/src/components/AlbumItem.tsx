import React from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';

interface ArtistListItemProps{
    name: string;
    img: string;
    artists: string[];
    date: string;
    track: number;
    link: string;
}

const ItemWrapper = styled.div`
    width: 100%;
    height: 40%;
    border: 1px solid #969696;
`;

const PhotoWrapper = styled.div`
    width: 100%;
    height: 400px;
    background: url(https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png);
`;

const Photo = styled.img`
    width: 100%;
    height: 400px;
`;

const InfoWrapper = styled.div`
    border-top: 1px solid #969696;
    box-sizing: border-box;
    padding: 10px;
    height: 180px;
`;

const NameWrapper = styled.div`
    font-size: 20px;
`;

const ArtistWrapper = styled.div`
    color: #67738a;
`;

const DateTrackWrapper = styled.div`
    position: absolute;
    bottom: 40px;
    color: #67738a;
`;

const LinkWrapper = styled.div`
    color: #67738a;
    background-color: #F1F1F1;
    text-align: center;
    font-size: 15px;
    height: 35px;
    border-top: 1px solid #969696;
    padding: 5px 0;
`;

const StyledLink = styled.a`
    color: #969696;
`;

export const AlbumItem: React.FC<ArtistListItemProps> = 
    ({name, img, artists, date, track, link}) => {

    return (
        <ItemWrapper>
            <PhotoWrapper>
                <Photo src={img} />
            </PhotoWrapper>
    
            <InfoWrapper>
                <NameWrapper>{name}</NameWrapper>
                <ArtistWrapper>
                    {artists.map((artist, index)=>([
                        index > 0 && ", ",
                        <span key={index}>{artist}</span>]
                    ))}
                </ArtistWrapper>
                <DateTrackWrapper>
                    <div>{date}</div>
                    <div>{`${track} tracks`}</div>
                </DateTrackWrapper>
            </InfoWrapper>
            <LinkWrapper>
                <StyledLink href={link} target="_blank">Preview on Spotify</StyledLink>
            </LinkWrapper>
        </ItemWrapper>
    )
}
