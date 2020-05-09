import React, { useState } from 'react';
import './Room.css';

export default function Room(props) {

    let maxItems = 12;

    const [room, setRoom] = useState(props.room);
    const [itemFlag, setItemFlag] = useState(false);
    const [itemSelected, setItemSelected] = useState('');
    const [roomId, setRoomId] = useState(props.room.id);
    const [roomItemsList, setRoomItemsList] = useState(props.listOfRoomItems);

    const handleShowItems = () => {
        if(room.items.length < maxItems) {
            setItemFlag(!itemFlag);
        }
        else {
            alert('Sorry, Cannot add any more items to this room');
        }
    }

    const handleItemSelected = () => {

        if(itemSelected !== '' && room.items.length < maxItems) {
            let itemObj = { item: itemSelected, status: 'button-off' };
            setItemSelected('');
            props.addItemToRoom(itemObj, roomId);
        }
        
        setItemFlag(!itemFlag);
    }

    const ChangeItemStatus = (e) => {
        let itemIndex = e.target.id;
        props.updateRoomItemStatus(itemIndex, room.id);
    }

    const handleDeleteItem = (e) => {
        let itemIndex = e.target.id;        
        props.deleteItem(itemIndex, room.id);
    }

    const handleDeleteAll = () => {
        props.deleteAllRoomItems(room.id);
    }

    
    return (
        <div className='current-room' style={{ backgroundColor: `${room.color}50` }}>
            <div className='room-header'>
                <h2><span style={{ fontSize: 18, paddingRight: 5 }} >Name: </span>{room.name}</h2>
                <h3><span style={{ fontSize: 16, paddingRight: 5 }} >Type: </span>{room.type}</h3>
                <br /><h5>~ click on each item to turn on/off ~</h5>
            </div>

            <div className='room-item-buttons'>
            {
                room.items.map((element, index) => (
                    <div className='items-container'>
                        <button id={index} onClick={handleDeleteItem} className='delete-item'>X</button>
                        <button
                            key={index}
                            id={index}
                            onClick={ChangeItemStatus}
                            className={`item-button ${element.status}`} 
                            style={{ backgroundColor: `${room.color}` }} >{element.item}</button>
                    </div>
                ))
            }
            </div>

            <div className='add-item-container'>
            {
                !itemFlag ?
                    <div>
                        <button className='add-item-button' onClick={handleShowItems}>Add Items To Room...</button><br /><br />
                        <button className='delete-all-items' onClick={handleDeleteAll}>Delete All Room Items</button>
                    </div>
                    :
                    <div>
                        <button className='add-item-button' onClick={handleItemSelected}>Add Item</button><br />
                        <select className='items-select' onChange={(e) => { setItemSelected(e.target.value) }} >
                            <option hidden>...</option>
                            {
                                roomItemsList.map(item => (
                                    <option value={`${item}`} >{item}</option>
                                ))
                            }
                        </select>
                    </div>
            }
            </div>
        </div>
    )
}
