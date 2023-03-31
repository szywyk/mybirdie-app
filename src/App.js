import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import MyBirds from "./components/pages/MyBirds";
import NoPage from "./components/pages/NoPage";
import SignInUp from "./components/pages/SignInUp";

function App() {
  return (
      <BrowserRouter>
      <Routes> {//Ewentualnie <Switch>, ale nie wiem czy zadziała i nie znam różnicy
      }
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="mybirds" element={<MyBirds />} />
          <Route path="*" element={<NoPage />} />
          <Route path='login' element={<SignInUp defaultKey='login' />} />
          <Route path='signup' element={<SignInUp defaultKey='signup' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
