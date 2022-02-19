import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UiElements/Card';
import Map from '../../shared/components/UiElements/Map';
import Modal from '../../shared/components/UiElements/Modal';

import './PlaceItem.css';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner';

const PlaceItem = (props) => {
   const auth = useContext(AuthContext);
   //    const navigate = useNavigate();

   const [showMap, setShowMap] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);
   const { error, isloading, clearError, sendRequest } = useHttpClient();

   const openMapHandler = () => setShowMap(true);

   const closeMapHandler = () => setShowMap(false);
   const showDeleteModal = () => setShowConfirm(true);
   const cancelDeleteModal = () => setShowConfirm(false);

   const confirmDelete = async () => {
      console.log('delete');
      try {
         await sendRequest(
            `http://localhost:5000/api/places/${props.id}`,
            'DELETE'
         );
         setShowConfirm(false);
         props.onDelete(props.id);
         //  navigate('/');
      } catch (e) {}
   };

   return (
      <React.Fragment>
         <ErrorModal error={error} onClear={clearError} />
         {isloading && (
            <div className="center">
               <LoadingSpinner />
            </div>
         )}
         <Modal
            show={showMap}
            onCancel={closeMapHandler}
            header={props.address}
            contentClass="place-item__modal-content"
            footerclass="place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
         >
            <div className="map-container">
               {/* <h2>THE MAP</h2> */}
               <Map center={props.coordinates} zoom={16} />
            </div>
         </Modal>
         <Modal
            show={showConfirm}
            onCancel={cancelDeleteModal}
            header="Are You Sure?"
            footerclass="place-item__modal-actions"
            footer={
               <React.Fragment>
                  <Button inverse onClick={cancelDeleteModal}>
                     Cancel
                  </Button>
                  <Button danger onClick={confirmDelete}>
                     Delete
                  </Button>
               </React.Fragment>
            }
         >
            <p>Are You Sure ?</p>
         </Modal>
         <li className="place-item">
            <Card className="place-item__content">
               <div className="place-item__image">
                  <img src={props.image} alt={props.title} />
               </div>
               <div className="place-item__info">
                  <h2>{props.title}</h2>
                  <h3>{props.address}</h3>
                  <p>{props.desc}</p>
               </div>
               <div className="place-item__actions">
                  <Button inverse onClick={openMapHandler}>
                     VIEW ON MAP
                  </Button>
                  {auth.userId === props.creatorId && (
                     <Button to={`/places/${props.id}`}>EDIT</Button>
                  )}
                  {auth.userId === props.creatorId && (
                     <Button danger onClick={showDeleteModal}>
                        DELETE
                     </Button>
                  )}
               </div>
            </Card>
         </li>
      </React.Fragment>
   );
};

export default PlaceItem;
