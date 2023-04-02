import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import MyBirds from "./components/pages/MyBirds";
import NoPage from "./components/pages/NoPage";
import SignInUp from "./components/pages/SignInUp";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user)
      setLoggedUser(user.email);
      setUserId(user.uid);
    } else {
      console.log('User logged out');
      setLoggedUser(null);
      setUserId(null);
    }
  });

  return (
    <BrowserRouter>
      <Routes> {//Ewentualnie <Switch>, ale nie wiem czy zadziała i nie znam różnicy
      }
        <Route path="/" element={<Navbar loggedUser={loggedUser} />}>
          <Route index element={<Home userId={userId} />} />
          <Route path="mybirds" element={<MyBirds userId={userId} />} />
          <Route path="*" element={<NoPage />} />
          <Route path='login' element={<SignInUp defaultKey='login' />} />
          <Route path='signup' element={<SignInUp defaultKey='signup' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
