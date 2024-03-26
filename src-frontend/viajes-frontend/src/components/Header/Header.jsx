import React, { useEffect, useState, useRef } from "react";
import "./header.css";
import defaultImg from "./profileImgs/default.png";
import { generateSimpleNotification } from "../Notification/Notification";
import { getNotificationsByUsername } from "../../service/notificationService";
import { useClickOutside } from "react-click-outside-hook";

// Defino el componente header, y le asigno por defecto la imagen de perfil defaultImg
export const Header = () => {

  // Logica para cargar la imagen del usuario, se guarda una por defecto
  const [showPopup, setShowPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [imgUrl, setImgUrl] = useState(defaultImg);
  const popupRef = useRef(null); // Referencia al elemento del popup


  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (activeUser && activeUser.imgUrl) {
      import(`./profileImgs/${activeUser.imgUrl}`)
        .then((module) => {
          setImgUrl(module.default);
        })
    }
  }, []);

  // Función para mostrar los popup
  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handlePopupSimpleNotification = () => {
    setShowNotificationPopup(!showNotificationPopup);
  };

  const handleClickOutside = () => {
    setShowPopup(false);
    setShowNotificationPopup(false);
  };

  useClickOutside(popupRef, handleClickOutside);


  // Lógica para gestionar el clicar fuera y cerrar el popup
  useEffect(() => {
    if (showPopup || showNotificationPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup, showNotificationPopup]);


  return (
    <div className="header">
      <div className="nivel-frame">
        <div className="nivel-frame-wrapper">
          <a href="/account" className="header-links">
            <div className="header-div">
              <div className="png-transparent-wrapper">
                <i className="fa-solid fa-plane-departure"></i>
              </div>
              <div className="div-wrapper">
                <div className="nivel-frame-2">
                  <div className="text-wrapper">EasyTravels</div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="nivel-frame-3">
          <div className="nivel-frame-4">
            <div className="nivel-frame-5">
              <div className="nivel-frame-6">
                <a className="header-a" href="/countries"><div className="text-wrapper-2">Countries</div></a>
              </div>
            </div>
            <div className="nivel-frame-7">
              <div className="nivel-frame-8">
                <a className="header-a" href="/cities"> <div className="text-wrapper-2">Cities</div></a>
              </div>
            </div>
            <div className="nivel-frame-9">
              <div className="nivel-frame-8">
                <a className="header-a" href="/attractions"> <div className="text-wrapper-2" onClick={deleteActiveUser}>Attractions</div></a>
              </div>
            </div>
            <div className="nivel-frame-10">
              <div className="nivel-frame-8">
                <a className="header-a" href="/itineraries"> <div className="text-wrapper-3">Itineraries</div></a>
              </div>
            </div>
          </div>
          <div className="nivel-frame-11">
            <div className="nivel-frame-12" onClick={handlePopupSimpleNotification}>
              <div className="nivel-frame-13">
                <div className="vector-wrapper">
                  <i className="fa-solid fa-envelope"></i>
                </div>
              </div>
            </div>
            <div className="nivel-frame-12">
              <div className="nivel-frame-13">
                <div className="vector-wrapper">
                  <i className="fa-solid fa-bell"></i>
                </div>
              </div>
            </div>
          </div>
          {/* <a href="/account"><div className="nivel-frame-14" style={{ backgroundImage: `url(${imgUrl})` }} /> */}
          <div onClick={handlePopupToggle} className="nivel-frame-14" style={{ backgroundImage: `url(${imgUrl})` }} />
        </div>
        {showPopup && <Popup />}
        {showNotificationPopup && <PopupNotification />}
      </div>
    </div>
  );
};

// Elimino esa cookie para garantizar que siempre que le de a ese enlace me salga todo el listado
function deleteActiveUser() {
  sessionStorage.removeItem('activeCity');
}

// Pop up de la notificacion
const PopupNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchData = async () => {
    try {
      const activeUser = JSON.parse(localStorage.getItem('activeUser'));
      const authToken = localStorage.getItem('authToken');
      const notificationsData = await getNotificationsByUsername(authToken, activeUser.username);

      // Verificar si notificationsData es un array no vacío antes de actualizar el estado
      if (Array.isArray(notificationsData) && notificationsData.length > 0) {
        setNotifications(notificationsData);
        console.log('No se encontraron notificacsiones.');
      }
    } catch (error) {
      console.error('Error al recuperar las notificaciones:', error);
    }
  };

  // Llamar a fetchData cuando se monta el componente para obtener las notificaciones iniciales
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>{generateSimpleNotification(notifications)}</>
  );
};


// Pop up del desplegable del usuario, agrego que se cierre al clicar fuera
const Popup = () => {
  // Recupero los datos del username
  const activeUser = JSON.parse(localStorage.getItem('activeUser'));
  return (
    <div className="popup-container">
      <div className="popup-my-account">
        <div className="popup-nivel4-frame0">
          <div className="popup-nivel5-frame0">
            <div className="popup-nivel6-frame0" ></div>
            <div className="popup-nivel6-frame2">
              <div className="popup-nivel7-frame0">
                <div className="popup-nivel8-frame0">
                  <span className="popup-text">
                    <span>{activeUser.username}</span>
                  </span>
                </div>
              </div>
              <div className="popup-nivel7-frame1">
                <div className="popup-nivel8-frame01">
                  <span className="popup-text2">
                    {activeUser.roles.join(',')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="/personal" className="a-no-style">
          <div className="popup-nivel4-frame1">
            <div className="popup-nivel5-frame01">
              <div className="popup-nivel6-frame01">
                <div className="popup-nivel7-frame01">
                  <i className="fa-solid fa-user"></i>
                </div>
              </div>
              <div className="popup-nivel6-frame1">
                <div className="popup-nivel7-frame02">
                  <span className="popup-text4">
                    <span>Go to My Account</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
        <a href="/" className="a-no-style">
          <div className="popup-my-account1">
            <div className="popup-nivel5-frame02">
              <div className="popup-nivel6-frame02">
                <div className="popup-nivel7-frame03">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
              </div>
              <div className="popup-nivel6-frame11">
                <div className="popup-nivel7-frame04">
                  <span className="popup-text6">
                    <span>Sign Out</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

