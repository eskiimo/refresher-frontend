import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/input";
import Button from "../../shared/components/FormElements/Button";
import "./NewPlace.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: { value: "", isValid: false },
      desc: { value: "", isValid: false },
    },
    isValid: false,
  });

  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <form className="place-form">
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
      <Button type="submit" disabled={!formState.isValid}>
        {" "}
        Add Place
      </Button>
    </form>
  );
};
export default NewPlace;
