import React, { useState } from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import AddRoom from './AddRoom/AddRoom';
import Room from './Room/Room';


function App() {

  let listOfItems = [
    { type: 'bedroom', itemsList: ['desk lamp', 'television', 'fireplace', 'computer', 'stereo system', 'air conditioner'] },
    { type: 'kitchen', itemsList: ['microwave', 'oven', 'kettle', 'wall lamp', 'television', 'air conditioner'] },
    { type: 'bathroom', itemsList: ['water heater', 'wall lamp', 'washing machine', 'drying machine', 'air conditioner'] },
  ];

  const [listOfRooms, setListOfRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const [listOfRoomItems, setListOfRoomItems] = useState({});

  const addRoom = (newRoomObj) => {
    setListOfRooms([...listOfRooms, newRoomObj]);
  }

  const updateCurrentRoom = (currentRoomId) => {
    let current = listOfRooms.filter(room => room.id === currentRoomId)[0];
    let itemsList = [];

    // check room type and set listOfRoomItems
    if (current.type === 'bathroom') {
      itemsList = listOfItems[2].itemsList;
    }
    else if (current.type === 'kitchen') {
      itemsList = listOfItems[1].itemsList;
    }
    else {
      itemsList = listOfItems[0].itemsList;
    }

    setListOfRoomItems(itemsList);
    setCurrentRoom(current);
  }

  const addItemToRoom = (newItemObj, roomId) => {
    currentRoom.items = [...currentRoom.items, newItemObj];    
  }

  const updateRoomItemStatus = (itemIndex, roomId) => {
    let currentStatus = currentRoom.items[itemIndex].status;
    if (currentStatus === 'button-off') {
      currentStatus = 'button-on';
    }
    else {
      currentStatus = 'button-off';
    }

    let items = currentRoom.items;
    items[itemIndex].status = currentStatus;
    currentRoom.items = items;

    let updatedList = listOfRooms.map(room =>
      room.id === roomId ? currentRoom : room
    );

    setListOfRooms(updatedList);

  }

  const deleteRoomFromList = (roomId) => {
    let updatedList = listOfRooms.filter(room => room.id !== roomId);
    setListOfRooms(updatedList);
  }

  const deleteAllRooms = () => {
    setListOfRooms([]);
  }

  const deleteItem = (itemIndex, roomId) => {

    let updatedCurrentItems = currentRoom.items.splice(itemIndex, 1);
    console.log(updatedCurrentItems);

    let updatedList = listOfRooms.map(room =>
      room.id === roomId ? currentRoom : room
    );

    setListOfRooms(updatedList);
    console.log('item deleted');

  }

  const deleteAllRoomItems = (roomId) => {
    currentRoom.items = [];

    let updatedList = listOfRooms.map(room =>
      room.id === roomId ? currentRoom : room
    );

    setListOfRooms(updatedList);
  }

  return (
    <div className="App">

      <Router>
        <Link to="/">
          <button className='homeButton'>Home</button>
        </Link>
        <div className='header'>
          <h1 className='app-title'>Smart House React App</h1>
        </div>

        <Switch>

          <Route exact path='/' component={() => {
            return <HomePage
              listOfRooms={listOfRooms}
              updateCurrentRoom={updateCurrentRoom}
              deleteRoomFromList={deleteRoomFromList}
              deleteAllRooms={deleteAllRooms} />
          }} />

          <Route exact path='/addRoom' component={() => {
            return <AddRoom
              addRoom={addRoom} />
          }} />

          <Route exact path='/room' component={() => {
            return <Room
              room={currentRoom}
              addItemToRoom={addItemToRoom}
              updateRoomItemStatus={updateRoomItemStatus}
              deleteItem={deleteItem}
              deleteAllRoomItems={deleteAllRoomItems}
              listOfRoomItems={listOfRoomItems} />
          }} />

        </Switch>
      </Router>

    </div>
  );
}

export default App;
