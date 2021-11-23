import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Cairo Tower",
    desc: "ew3a tnot mn fo2 3shan htmot",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Cairotower.jpg",
    address: "Cairo, Egypt",
    location: {
      lat: "30.082782,31.321106",
      lon: "30.0681037,31.2073443",
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
      lat: "30.082782,31.321106",
      lon: "30.0681037,31.2073443",
    },
    creator: "u1",
  },
];
const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};
export default UserPlaces;
