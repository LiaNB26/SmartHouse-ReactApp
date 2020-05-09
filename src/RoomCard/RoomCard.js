import React from 'react';
import './RoomCard.css';

export default function RoomCard(props) {
    let roomColor = props.room.color;

    return (
        <div className={`single-card ${props.room.type}`} style={{ borderColor: roomColor, color: roomColor }} >
            <abbr title="click to enter room...">
                <div className='header-card-container'>
                    <h2 className='card-room-font'>{props.room.name}</h2>
                    <h3 className='card-room-font'>{props.room.type}</h3>
                </div>
            </abbr>
        </div>
    )
}
