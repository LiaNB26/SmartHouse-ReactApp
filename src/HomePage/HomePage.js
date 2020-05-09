import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoomCard from '../RoomCard/RoomCard';
import './HomePage.css'


export default function HomePage(props) {

    const [listOfRooms] = useState(props.listOfRooms);

    const handleRoomEnter = (roomId) => {
        props.updateCurrentRoom(roomId);
    }

    const handleDeleteRoom = (e) => {
        let roomId = e.target.id;
        props.deleteRoomFromList(roomId);
    }

    const handleDeleteAll = () => {
        props.deleteAllRooms();
    }

    return (
        <div className='home-page'>
            <Link to="/addRoom">
                <button className='add-room-myButton'>Add Room</button>
            </Link>
            {
                listOfRooms.length !== 0 ?
                <button onClick={handleDeleteAll} className='add-room-myButton delete-all'>Delete All Rooms</button>
                :
                <button disabled className='disable-delete-all-btn delete-all'>Delete All Rooms</button>

            }

            <div className='room-list'>
                {
                    listOfRooms.map((room) => (

                        <div className='room-cards-container'>
                            <button className='delete-button' id={room.id} onClick={handleDeleteRoom} style={{ color: room.color }}>X</button>
                            <Link to="/room" className='linkClass' onClick={() => { handleRoomEnter(room.id) }} >
                                <RoomCard key={room.id} room={room} />
                            </Link>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

