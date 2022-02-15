import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner';
import UserList from '../components/UsersList';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
   const { error, clearError, sendRequest, isloading } = useHttpClient();
   const [loadedUsers, setLoadedUsers] = useState([]);
   useEffect(() => {
      const getAllUsers = async () => {
         setIsLoading(true);
         try {
            const responseData = await sendRequest(
               'http://localhost:5000/api/users'
            );

            setLoadedUsers(responseData.users);
         } catch (e) {
            console.log(e.message);
         }
      };
      getAllUsers();
   }, [sendRequest]);

   return (
      <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
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
