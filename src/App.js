import React, { useState, useCallback } from 'react';
import {
 Routes,
 Route,
 BrowserRouter as Router,
 Navigate,
} from 'react-router-dom';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import Users from './user/pages/Users';
import Auth from './user/pages/Auth';

import { AuthContext } from './shared/context/auth-context';

const App = () => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const login = useCallback(() => {
  setIsLoggedIn(true);
 }, []);
 const logout = useCallback(() => {
  setIsLoggedIn(false);
 }, []);

 let routes;
 if (isLoggedIn) {
  routes = (
   <Routes>
    <Route path="/" exact="true" element={<Users />}></Route>
    <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
    <Route path="/:userId/places" exact="true" element={<UserPlaces />}></Route>
    <Route path="/places/new" exact="true" element={<NewPlace />}></Route>

    <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
    <Route path="/" element={<Navigate to="/auth" />}></Route>
   </Routes>
  );
 } else {
  routes = (
   <Routes>
    <Route path="/" exact="true" element={<Users />}></Route>
    <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
    <Route path="/:userId/places" exact="true" element={<UserPlaces />}></Route>

    <Route path="/auth" element={<Auth />} />
    <Route path="/" element={<Navigate to="/auth" />} />
   </Routes>
  );
 }
 return (
  <AuthContext.Provider
   value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
  >
   <Router>
    <MainNavigation />
    <main>{routes}</main>
   </Router>
  </AuthContext.Provider>
 );
};

export default App;
