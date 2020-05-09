import React, { useState } from 'react';
import './AddRoom.css';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';


export default function AddRoom(props) {

    const [roomType, setRoomType] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomColor, setRoomColor] = useState('#000000');

    const addNewRoom = () => {

        if (roomType === '') {
            alert('Please select a room type!');
        }
        else if (roomName === '') {
            alert('Please enter a room name!');
        }
        else {
            let newRoomOjb = {
                id: uuid(),
                name: roomName,
                type: roomType,
                color: roomColor,
                items: []
            };

            console.log(roomColor);
            

            props.addRoom(newRoomOjb);
        }
    }

    return (
        <div className='add-room'>
            <div className='room-option'>
                <h4 className='option-title'>Select Room Type:</h4>
                <select className='room-type-select' onChange={(e) => { setRoomType(e.target.value) }} >
                    <option hidden>...</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="bathroom">Bathroom</option>
                    <option value="living room">Living Room</option>
                </select>
            </div>
            <div className='room-option'>
                <h4 className='option-title'>Enter Room Name:</h4>
                <input className='input-box' type='text' placeholder='room name' onChange={(e) => { setRoomName(e.target.value) }} />
            </div>
            <div className='room-option'>
                <h4 className='option-title'>Select Room Color:</h4>
                <input className='color-box' type='color' onChange={(e) => { setRoomColor(e.target.value) }} />
            </div>

            <div className='room-option'>
                <Link to="/">
                    <button className='add-new-room-button' onClick={addNewRoom} >Add Room</button>
                </Link>
            </div>
        </div>
    )
}
