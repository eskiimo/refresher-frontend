import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../shared/components/FormElements/input';
import Button from '../../shared/components/FormElements/Button';
import './PlaceForm.css';

import {
   VALIDATOR_REQUIRE,
   VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UiElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';

const UpdatePlace = () => {
   const placeId = useParams().placeId;
   const navigate = useNavigate();
   const auth = useContext(AuthContext);
   const [placeToUpdate, setPlaceToUpdate] = useState();
   const { error, isLoading, clearError, sendRequest } = useHttpClient();

   const [formState, inputHandler, setFormData] = useForm(
      {
         title: {
            value: '',
            isValid: false,
         },
         desc: {
            value: '',
            isValid: false,
         },
      },
      false
   );

   useEffect(() => {
      const getPlaceToUpdate = async () => {
         try {
            const responseData = await sendRequest(
               process.env.REACT_APP_BACKENDURL + `/places/${placeId}`
            );
            setPlaceToUpdate(responseData.place);
            setFormData(
               {
                  title: {
                     value: responseData.place.title,
                     isValid: true,
                  },
                  desc: {
                     value: responseData.place.desc,
                     isValid: true,
                  },
               },
               true
            );
         } catch (e) {}
      };
      getPlaceToUpdate();
   }, [setFormData, placeId, sendRequest]);

   const updateSubmit = async (event) => {
      event.preventDefault();
      try {
         await sendRequest(
            process.env.REACT_APP_BACKENDURL + `/places/${placeId}`,
            'PATCH',
            JSON.stringify({
               title: formState.inputs.title.value,
               desc: formState.inputs.desc.value,
            }),
            {
               'Content-Type': 'application/json',
               Authorization: 'Bearer ' + auth.token,
            }
         );
         navigate(`/${auth.userId}/places`);
      } catch (e) {
         console.log(e.message);
      }
   };

   if (!placeToUpdate && !error) {
      return (
         <div className="center">
            <Card>
               <h2>404</h2>
            </Card>
         </div>
      );
   }

   if (isLoading) {
      return (
         <div className="center">
            <h2>Loading</h2>{' '}
         </div>
      );
   }
   return (
      <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
         {!isLoading && placeToUpdate && (
            <form className="place-form" onSubmit={updateSubmit}>
               <Input
                  id="title"
                  element="input"
                  type="text"
                  label="Title"
                  validators={[VALIDATOR_REQUIRE()]}
                  errrText="enter a valid value"
                  onInput={inputHandler}
                  initialValue={placeToUpdate.title}
                  initialValid={true}
               />
               <Input
                  id="desc"
                  element="teaxtarea"
                  label="Description"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errrText="enter a valid desc"
                  onInput={inputHandler}
                  initialValue={placeToUpdate.desc}
                  initialValid={true}
               />
               <Button type="submit" disabled={!formState.isValid}>
                  UPDATE
               </Button>
            </form>
         )}
      </React.Fragment>
   );
};

export default UpdatePlace;
