import React from 'react';
import { Rate } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';

interface ArtistListItemProps{
    name: string;
    img: string;
    follower: number;
    popularity: number;
    onClick: ()=>void;
}

const ItemWrapper = styled.div`
    width: 100%;
    height: 30%;
    border: 1px solid #969696;
`;

const Photo = styled.img`
    width: 100%;
    height: 400px;
`;

const InfoWrapper = styled.div`
    border-top: 1px solid #969696;
    box-sizing: border-box;
    padding: 10px;
`;

const NameWrapper = styled.div`
    font-size: 20px;
`;

const FollowerWrapper = styled.div`
    color: #67738a;
`;

export const ArtistListItem: React.FC<ArtistListItemProps> = 
    ({name, img, follower, popularity, onClick}) => {
    
    const rate = (popularity/100)*5;
    const formattedFollower = follower.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <ItemWrapper onClick={onClick}>
            <Photo src={img} alt="Artist_Image" />
    
            <InfoWrapper>
                <NameWrapper>{name}</NameWrapper>
                <FollowerWrapper>
                    {`${formattedFollower} followers`}
                </FollowerWrapper>
                <Rate disabled allowHalf defaultValue={rate} />
            </InfoWrapper>

        </ItemWrapper>
    )
}
