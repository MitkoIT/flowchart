import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Diagram from './components/Diagram.js';

export default function App() {
  const routes = [
    {
      key: 0,
      path: '/',
      elements: [
        <p key={0}>Main Page</p>
      ]
    },
    {
      key: 1,
      path: '/diagram/resource/:id',
      elements: [
        <Diagram key={0}/>
      ]
    }
  ];
  
  const routeComponents = routes.map((route) => (
    <Route
      key={route.key}
      path={route.path}
      element={route.elements}
    />
  ));

  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/">
            {routeComponents}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
