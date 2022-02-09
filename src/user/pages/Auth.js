import React, { useState, useContext } from 'react';
import Input from '../../shared/components/FormElements/input';
import Button from '../../shared/components/FormElements/Button';

import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

import {
   VALIDATOR_REQUIRE,
   VALIDATOR_MINLENGTH,
   VALIDATOR_EMAIL,
} from '../../shared/util/validators';
import Card from '../../shared/components/UiElements/Card';

const Auth = () => {
   const auth = useContext(AuthContext);
   const [isLoginMode, setIsloginMode] = useState(true);
   const [formState, InputHandler, setFormData] = useForm(
      {
         email: { value: '', isValid: false },
         password: { value: '', isValid: false },
      },
      false
   );

   const switchModeHandler = () => {
      if (!isLoginMode) {
         setFormData(
            {
               ...formState.inputs,
               name: undefined,
            },
            formState.inputs.email.isValid && formState.inputs.password.isValid
         );
      } else {
         setFormData(
            {
               ...formState.inputs,
               name: {
                  value: '',
                  isValid: false,
               },
            },
            false
         );
      }
      setIsloginMode((prevMode) => !prevMode);
   };

   const onSubmitHandler = async (event) => {
      event.preventDefault();
      console.log(formState.inputs);

      if (isLoginMode) {
         // try{
         //     await fetch('http://localhost:5000/api/users/signup', {
         //         method: 'POST',
         //         headers: {
         //            'Content-Type': 'application/json',
         //         },
         //         body: JSON.stringify({
         //            name: formState.inputs.name.value,
         //            email: formState.inputs.email.value,
         //            password: formState.inputs.password.value,
         //         }),
         //      });
         // }catch(e){
         //     console.log(e)
         // }
      } else {
         try {
            const response = await fetch(
               'http://localhost:5000/api/users/signup',
               {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     name: formState.inputs.name.value,
                     email: formState.inputs.email.value,
                     password: formState.inputs.password.value,
                  }),
               }
            );
            response = await response.json();
            console.log(response.status);
         } catch (e) {
            console.log(e);
         }
      }
      auth.login(); //send to BackEnd
   };

   return (
      <Card className="auth">
         <h2>Login required</h2>
         <hr />
         <form className="place-form" onSubmit={onSubmitHandler}>
            {!isLoginMode ? (
               <Input
                  element="input"
                  id="name"
                  type="text"
                  label="NAME"
                  validators={[VALIDATOR_REQUIRE]}
                  errorText="please enter a name"
                  onInput={InputHandler}
               ></Input>
            ) : null}
            <Input
               id="email"
               element="input"
               type="email"
               label="Email"
               validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
               errorText="wrong email format."
               onInput={InputHandler}
            />
            <Input
               id="password"
               element="input"
               type="text"
               label="Password"
               validators={[VALIDATOR_MINLENGTH(8)]}
               errorText="Incorrect Password."
               onInput={InputHandler}
            />

            <Button type="submit" disabled={!formState.isValid}>
               {' '}
               {isLoginMode ? 'LOGIN' : 'SIGN UP'}
            </Button>
         </form>
         <Button inverse onClick={switchModeHandler}>
            {isLoginMode ? 'SIGN UP' : 'LOGIN'}
         </Button>
      </Card>
   );
};

export default Auth;
