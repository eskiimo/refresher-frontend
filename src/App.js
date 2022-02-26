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
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
   const { login, logout, token, userId } = useAuth();

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
