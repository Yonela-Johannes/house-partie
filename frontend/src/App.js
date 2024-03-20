import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom'
import CreateRoomPage from './pages/CreateRoomPage';
import JoinRoomPage from './pages/JoinRoomPage';
import Room from './pages/Room';

function App() {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/create-room' element={<CreateRoomPage />} />
            <Route path='/join-room' element={<JoinRoomPage />} />
            <Route path='/room' element={<Room />} />
        </Routes>
    )
}

export default App;