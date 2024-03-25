import React, { useEffect, useState } from "react";
import "./style.css";
import defaultImg from "./profileImgs/default.png";
import { generateSimpleNotificacion } from "../Notification/Notification";

// Defino el componente header, y le asigno por defecto la imagen de perfil defaultImg
export const Header = () => {

  // Logica para cargar la imagen del usuario, se guarda una por defecto
  const [showPopup, setShowPopup] = useState(false);
  const [imgUrl, setImgUrl] = useState(defaultImg);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (activeUser && activeUser.imgUrl) {
      import(`./profileImgs/${activeUser.imgUrl}`)
        .then((module) => {
          setImgUrl(module.default);
        })
    }
  }, []);

  // Función para mostrar el popup
  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handlePopupSimpleNotification = () => {
    
  };


  return (
    <div className="header">
      <div className="depth-frame">
        <div className="depth-frame-wrapper">
          <a href="/account" className="header-links">
            <div className="header-div">
              <div className="png-transparent-wrapper">
                <i className="fa-solid fa-plane-departure"></i>
              </div>
              <div className="div-wrapper">
                <div className="depth-frame-2">
                  <div className="text-wrapper">EasyTravels</div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="depth-frame-3">
          <div className="depth-frame-4">
            <div className="depth-frame-5">
              <div className="depth-frame-6">
                <a className="header-a" href="/countries"><div className="text-wrapper-2">Countries</div></a>
              </div>
            </div>
            <div className="depth-frame-7">
              <div className="depth-frame-8">
                <a className="header-a" href="/cities"> <div className="text-wrapper-2">Cities</div></a>
              </div>
            </div>
            <div className="depth-frame-9">
              <div className="depth-frame-8">
                <a className="header-a" href="/attractions"> <div className="text-wrapper-2" onClick={deleteActiveUser}>Attractions</div></a>
              </div>
            </div>
            <div className="depth-frame-10">
              <div className="depth-frame-8">
                <a className="header-a" href="/itineraries"> <div className="text-wrapper-3">Itineraries</div></a>
              </div>
            </div>
          </div>
          <div className="depth-frame-11" onClick={handlePopupSimpleNotification}> 
            <div className="depth-frame-12">
              <div className="depth-frame-13">
                <div className="vector-wrapper">
                  <i className="fa-solid fa-envelope"></i>
                </div>
              </div>
            </div>
            <div className="depth-frame-12">
              <div className="depth-frame-13">
                <div className="vector-wrapper">
                  <i className="fa-solid fa-bell"></i>
                </div>
              </div>
            </div>
          </div>
          {/* <a href="/account"><div className="depth-frame-14" style={{ backgroundImage: `url(${imgUrl})` }} /> */}
          <div onClick={handlePopupToggle} className="depth-frame-14" style={{ backgroundImage: `url(${imgUrl})` }} />
        </div>
        {showPopup && <Popup />}
      </div>
    </div>
  );
};

// Elimino esa cookie para garantizar que siempre que le de a ese enlace me salga todo el listado
function deleteActiveUser() {
  sessionStorage.removeItem('activeCity');
}

const Popup = () => {
  // Recupero los datos del username
  const activeUser = JSON.parse(localStorage.getItem('activeUser'));
  return (
    <div className="popup-container">
      <div className="popup-my-account">
        <div className="popup-depth4-frame0">
          <div className="popup-depth5-frame0">
            <div className="popup-depth6-frame0" ></div>
            <div className="popup-depth6-frame2">
              <div className="popup-depth7-frame0">
                <div className="popup-depth8-frame0">
                  <span className="popup-text">
                    <span>{activeUser.username}</span>
                  </span>
                </div>
              </div>
              <div className="popup-depth7-frame1">
                <div className="popup-depth8-frame01">
                  <span className="popup-text2">
                    {activeUser.roles.join(',')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="/personal" className="a-no-style">
          <div className="popup-depth4-frame1">
            <div className="popup-depth5-frame01">
              <div className="popup-depth6-frame01">
                <div className="popup-depth7-frame01">
                  <i className="fa-solid fa-user"></i>
                </div>
              </div>
              <div className="popup-depth6-frame1">
                <div className="popup-depth7-frame02">
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
            <div className="popup-depth5-frame02">
              <div className="popup-depth6-frame02">
                <div className="popup-depth7-frame03">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
              </div>
              <div className="popup-depth6-frame11">
                <div className="popup-depth7-frame04">
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
  )
}
