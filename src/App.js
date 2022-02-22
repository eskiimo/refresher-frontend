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
   const [token, setToken] = useState(null);
   const [userId, setUserId] = useState(false);

   const login = useCallback((uid, token) => {
      setToken(token);
      setUserId(uid);
   }, []);

   const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
   }, []);

   let routes;
   if (token) {
      routes = (
         <Routes>
            <Route path="/" exact="true" element={<Users />}></Route>
            <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
            <Route
               path="/:userId/places"
               exact="true"
               element={<UserPlaces />}
            ></Route>
            <Route
               path="/places/new"
               exact="true"
               element={<NewPlace />}
            ></Route>

            <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
            <Route path="/" element={<Navigate to="/auth" />}></Route>
         </Routes>
      );
   } else {
      routes = (
         <Routes>
            <Route path="/" exact="true" element={<Users />}></Route>
            <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
            <Route
               path="/:userId/places"
               exact="true"
               element={<UserPlaces />}
            ></Route>

            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Navigate to="/auth" />} />
         </Routes>
      );
   }
   return (
      <AuthContext.Provider
         value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            login: login,
            logout: logout,
         }}
      >
         <Router>
            <MainNavigation />
            <main>{routes}</main>
         </Router>
      </AuthContext.Provider>
   );
};

export default App;
