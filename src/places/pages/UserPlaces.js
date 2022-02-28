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
               process.env.REACT_APP_BACKENDURL + `/places/user/${userId}`,
               'GET'
            );
            setLoadedPlaces(responseData.places);
         } catch (e) {
            console.log(e.message);
         }
      };
      getPlaces();
   }, [sendRequest, userId]);

   const onDeletePlace = (deletedPlaceId) => {
      setLoadedPlaces((prev) =>
         prev.filter((place) => place.id !== deletedPlaceId)
      );
   };

   return (
      <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
         {isloading && (
            <div className="center">
               <LoadingSpinner />
            </div>
         )}
         {!isloading && loadedPlaces && (
            <PlaceList items={loadedPlaces} onDelete={onDeletePlace} />
         )}
      </React.Fragment>
   );
};
export default UserPlaces;
