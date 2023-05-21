import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../shared/components/FormElements/input';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/imageUpload';
import './PlaceForm.css';
import {
   VALIDATOR_MINLENGTH,
   VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner';

const NewPlace = () => {
   const auth = useContext(AuthContext);
   const [formState, InputHandler] = useForm(
      {
         title: { value: '', isValid: false },
         desc: { value: '', isValid: false },
         address: { value: '', isValid: false },
      },
      false
   );

   const { error, isloading, clearError, sendRequest } = useHttpClient();

   const navigate = useNavigate();
   const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
         const formData = new FormData();
         formData.append('title', formState.inputs.title.value);
         formData.append('desc', formState.inputs.desc.value);
         formData.append('address', formState.inputs.address.value);
         formData.append('image', formState.inputs.image.value);
         await sendRequest(
            process.env.REACT_APP_BACKENDURL + 'places',
            'POST',
            formData,
            {
               Authorization: 'Bearer ' + auth.token,
            }
         );
         //redirect ro different page
         navigate('/');
      } catch (e) {
         console.log(e.message);
      }
   };

   return (
      <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
         {isloading && <LoadingSpinner asOverlay />}
         <form className="place-form" onSubmit={onSubmitHandler}>
            <Input
               id="title"
               element="input"
               type="text"
               label="Title"
               validators={[VALIDATOR_REQUIRE()]}
               errorText="Please Enter A Valid Title."
               onInput={InputHandler}
            />
            <Input
               id="desc"
               element="textarea"
               label="Description"
               validators={[VALIDATOR_MINLENGTH(5)]}
               errorText="Please Enter A Valid description at least 5 charachters."
               onInput={InputHandler}
            />
            <Input
               id="address"
               element="input"
               type="text"
               label="address"
               validators={[VALIDATOR_REQUIRE()]}
               errorText="Please Enter A Valid Address"
               onInput={InputHandler}
            />
            <ImageUpload id="image" center onInput={InputHandler} />
            <Button type="submit" disabled={!formState.isValid}>
               {' '}
               Add Place
            </Button>
         </form>
      </React.Fragment>
   );
};
export default NewPlace;