import React, { useEffect, useState } from 'react';
import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner';
import { useParams } from 'react-router-dom';

const UserPlaces = () => {
   const userId = useParams().userId;

   const [loadedPlaces, setLoadedPlaces] = useState([]);
   const { isloading, error, clearError, sendRequest } = useHttpClient();
   useEffect(() => {
      const getPlaces = async () => {
         try {
            const responseData = await sendRequest(
               `http://localhost:5000/api/places/user/${userId}`,
               'GET'
            );
            setLoadedPlaces(responseData.places);
         } catch (e) {
            console.log(e.message);
         }
      };
      getPlaces();
   }, [sendRequest, userId]);

   return (
      <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
         {isloading && (
            <div className="center">
               <LoadingSpinner />
            </div>
         )}
         {!isloading && loadedPlaces && <PlaceList items={loadedPlaces} />}
      </React.Fragment>
   );
};
export default UserPlaces;
