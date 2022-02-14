import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner';
import UserList from '../components/UsersList';

const Users = () => {
   const [isloading, setIsLoading] = useState(false);
   const [error, setError] = useState(false);
   const [loadedUsers, setLoadedUsers] = useState([]);
   useEffect(() => {
      const getAllUsers = async () => {
         setIsLoading(true);
         try {
            const response = await fetch('http://localhost:5000/api/users');
            const responseData = await response.json();
            if (!response.ok) {
               throw new Error(responseData.message);
            }

            setLoadedUsers(responseData.users);
         } catch (e) {
            setError(e.message);
         }

         setIsLoading(false);
      };
      getAllUsers();
   }, []);
   const errorHandler = () => {
      setError(null);
   };

   return (
      <React.Fragment>
         <ErrorModal error={error} onClear={errorHandler} />
         {isloading && (
            <div className="center">
               <LoadingSpinner />
            </div>
         )}
         {!isloading && loadedUsers && <UserList items={loadedUsers} />}
      </React.Fragment>
   );
};

export default Users;
