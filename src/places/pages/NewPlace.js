import React from "react";
import Input from "../../shared/components/FormElements/input";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceForm.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";

const NewPlace = () => {
  const [formState, InputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      desc: { value: "", isValid: false },
      address: { value: "", isValid: false },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); //send to BackEnd
  };

  return (
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
      <Button type="submit" disabled={!formState.isValid}>
        {" "}
        Add Place
      </Button>
    </form>
  );
};
export default NewPlace;
