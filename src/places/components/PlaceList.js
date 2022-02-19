import React from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UiElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = (props) => {
   if (props.items.length === 0) {
      return (
         <div className="place-list center">
            <Card>
               <h2> No Places Found</h2>
               <Button to="/places/new">ADD PLACE</Button>
            </Card>
         </div>
      );
   }

   return (
      <ul className="place-list">
         {props.items.map((place) => (
            <PlaceItem
               key={place.id}
               id={place.id}
               image={place.imageUrl}
               title={place.title}
               desc={place.desc}
               address={place.address}
               creatorId={place.creator}
               coordinates={place.location}
               onDelete={props.onDelete}
            />
         ))}
      </ul>
   );
};

export default PlaceList;
