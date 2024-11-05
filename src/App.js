import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from './routes.js';

export default function App() {  
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
