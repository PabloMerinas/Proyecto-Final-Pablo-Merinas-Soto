import React, { useEffect, useState } from "react";
import "./style.css";
import defaultImg from "./profileImgs/default.png";

// Defino el componente header, y le asigno por defecto la imagen de perfil defaultImg
export const Header = () => {

  // Logica para cargar la imagen del usuario, se guarda una por defecto
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
          <div className="depth-frame-11">
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
          <a href="/personal">
            <div className="depth-frame-14" style={{ backgroundImage: `url(${imgUrl})` }} />
          </a>
        </div>
      </div>
    </div>
  );
};

// Elimino esa cookie para garantizar que siempre que le de a ese enlace me salga todo el listado
function deleteActiveUser(){
  sessionStorage.removeItem('activeCity');
}