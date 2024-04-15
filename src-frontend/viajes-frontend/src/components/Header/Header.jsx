import React, { useEffect, useState, useRef } from "react";
import "./header.css";
import { generateSimpleNotification, NoNotifications } from "../Notification/Notification";
import { getNotificationsByUsername } from "../../service/notificationService";
import { useClickOutside } from "react-click-outside-hook";
import { useAuth } from '../../authContext/autContext';
import { Link } from 'react-router-dom';

// Defino el componente header, y le asigno por defecto la imagen de perfil defaultImg
export const Header = () => {
  // Logica para cargar la imagen del usuario, se guarda una por defecto
  const [showPopup, setShowPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const popupRef = useRef(null); // Referencia al elemento del popup
  const [notificationCount, setNotificationCount] = useState(0);
  const { activeUser } = useAuth();

  useEffect(() => {
    // Metodo para contar las notificaciones y asi mostrarlas
    const countNotifications = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const notificationsData = await getNotificationsByUsername(authToken, activeUser.username);
        const count = Array.isArray(notificationsData) ? notificationsData.length : 0;
        setNotificationCount(count);
      } catch (error) {
        console.error('Error counting notifications:', error);
      }
    };

    countNotifications();
  }, [activeUser]);

  // Función para mostrar los popup
  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handlePopupSimpleNotification = () => {
    setShowNotificationPopup(!showNotificationPopup);
  };

  const handleClickOutside = (event) => {
    // Aqui hago que se pueda cerrar clicando fuera pero no dentro de esos contenedores
    if (!event.target.closest('.simple-notification-container') && !event.target.closest('.popup-container') && !event.target.closest('.popup-no-notification')) {
      setShowPopup(false);
      setShowNotificationPopup(false);
    }

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

  // Pop up del desplegable del usuario, agrego que se cierre al clicar fuera
  const Popup = () => {
    return (
      <div className="popup-container">
        <div className="popup-my-account">
          <div className="popup-nivel4-frame0">
            <div className="popup-nivel5-frame0">
              <div className="popup-nivel6-frame0" >
              <img src={activeUser.imgUrl} alt="Imagen de perfil del usuario activo" />
              </div>
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
          <Link to="/personal" className="a-no-style">
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
          </Link>
          <Link to="/" className="a-no-style">
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
          </Link>
        </div>
      </div>
    );
  };


  // Pop up de la notificacion
  const PopupNotification = () => {
    const [notifications, setNotifications] = useState([]);
    const [isVisible, setIsVisible] = useState(false); // Estado para manejar la visibilidad del popup
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar que se haya cargado el fetch


    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const notificationsData = await getNotificationsByUsername(authToken, activeUser.username);

        // Verificar si notificationsData es un array no vacío antes de actualizar el estado
        if (Array.isArray(notificationsData) && notificationsData.length > 0) {
          setNotifications(notificationsData);
          setIsVisible(true); // Mostrar el popup cuando hay notificaciones
          setIsLoading(false);
        } else {
          setIsVisible(false); // Ocultar el popup cuando no hay notificaciones
          setIsLoading(false);

        }
      } catch (error) {
        console.error('Error al recuperar las notificaciones:', error);
      }
    };

    // Llamar a fetchData cuando se monta el componente para obtener las notificaciones
    useEffect(() => {
      fetchData();
    }, []);

    if (notifications.length === 0 && !isLoading) {
      return (
        <div className='popup-no-notification'>
          {NoNotifications('393px')}
        </div>
      );
    }

    return (
      <div className={`popup-notification ${isVisible ? 'show' : ''}`}>
        {generateSimpleNotification(notifications)}
      </div>);
  };


  return (
    <div className="header">
      <div className="nivel-frame">
        <div className="nivel-frame-wrapper">
          <Link to="/account" className="header-links">
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
          </Link>
        </div>
        <div className="nivel-frame-3">
          <div className="nivel-frame-4">
            <div className="nivel-frame-5">
              <div className="nivel-frame-6">
                <Link className="header-a" to="/countries"><div className="text-wrapper-2" onClick={deleteSessionCookies}>Countries</div></Link>
              </div>
            </div>
            <div className="nivel-frame-7">
              <div className="nivel-frame-8">
                <Link className="header-a" to="/cities"> <div className="text-wrapper-2" onClick={deleteSessionCookies}>Cities</div></Link>
              </div>
            </div>
            <div className="nivel-frame-9">
              <div className="nivel-frame-8">
                <Link className="header-a" to="/attractions"> <div className="text-wrapper-2" onClick={deleteSessionCookies}>Attractions</div></Link>
              </div>
            </div>
            <div className="nivel-frame-10">
              <div className="nivel-frame-8">
                <Link className="header-a" to="/itineraries"> <div className="text-wrapper-3">Itineraries</div></Link>
              </div>
            </div>
          </div>
          <div className="nivel-frame-11">
            <div className="nivel-frame-12" onClick={handlePopupSimpleNotification}>
              {notificationCount > 0 && (
                <div className="notification-counter">{notificationCount}</div>
              )}
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
          <div onClick={handlePopupToggle} className="nivel-frame-14">
            <img src={activeUser.imgUrl} alt="Imagen de perfil del usuario activo" />
          </div>

        </div>
        {showPopup && <Popup />}
        {showNotificationPopup && <PopupNotification />}
      </div>
    </div>
  );

};

// Elimino esa cookie para garantizar que siempre que le de a ese enlace me salga todo el listado
function deleteSessionCookies() {
  sessionStorage.removeItem('activeCity');
  sessionStorage.removeItem('activeCountry');
}



