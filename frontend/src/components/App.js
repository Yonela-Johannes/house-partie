import React, { Component } from 'react';
import { render } from 'react-dom';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom'
import CreateRoomPage from './pages/CreateRoomPage';
import JoinRoomPage from './pages/JoinRoomPage';

function App() {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/create-room' element={<CreateRoomPage />} />
            <Route path='/join-room' element={<JoinRoomPage />} />
        </Routes>
    )
}

export default App;