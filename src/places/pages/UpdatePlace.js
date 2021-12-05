import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/input";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceForm.css";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Cairo Tower",
    desc: "ew3a tnot mn fo2 3shan htmot",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Cairotower.jpg",
    address: "Cairo, Egypt",
    location: {
      lat: 30.082782,
      lng: 31.2073443,
    },

    creator: "u1",
  },
  {
    id: "p2",
    title: "Pyramids",
    desc: "ew3a t23od 3la el haram",
    imageUrl:
      "https://lp-cms-production.imgix.net/2020-11/shutterstockRF_1037036482.jpg",
    address: "Cairo, Egypt",
    location: {
      lat: 30.082782,
      lng: 31.2073443,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const placeToUpdate = DUMMY_PLACES.find((p) => p.id === placeId);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: placeToUpdate.title,
        isValid: true,
      },
      desc: {
        value: placeToUpdate.desc,
        isValid: true,
      },
    },
    true
  );

  const updateSubmit = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!placeToUpdate) {
    return (
      <div className="center">
        <h2>404</h2>{" "}
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={updateSubmit}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errrText="enter a valid value"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="desc"
        element="teaxtarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errrText="enter a valid desc"
        onInput={inputHandler}
        initialValue={formState.inputs.desc.value}
        initialValid={formState.inputs.desc.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE
      </Button>
    </form>
  );
};

export default UpdatePlace;
