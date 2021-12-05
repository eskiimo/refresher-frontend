import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Users from "./user/pages/Users";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" exact element={<Users />}></Route>
          <Route path="/:userId/places" exact element={<UserPlaces />}></Route>
          <Route path="/places/new" exact element={<NewPlace />}></Route>
          <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
