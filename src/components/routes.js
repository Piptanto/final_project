import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import VehicleDetails from './vehicleDetails';
import Articles from './articles';
import NotFound from './notfound';

export default function PageRoutes() {

    return (
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/vehicle' element={<VehicleDetails />} />
          <Route path='/article/:id' element={<Articles />} />
          <Route path="*" element={<NotFound />}/>
      </Routes>
    )
}