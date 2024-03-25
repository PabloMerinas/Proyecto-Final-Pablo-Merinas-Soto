import React, { useState } from "react";
import './style.css'
import { getUserInfo, updateUser } from "../../service/userService";

export const PersonalInfo = () => {
    // Traigo al usuario actual
    let activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const token = localStorage.getItem("authToken");
    // Defino las variables y sus valores por defecto
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState(activeUser.email);
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState(activeUser.phone);
    const [photo, setPhoto] = useState();
    const [bio, setBio] = useState(activeUser.bio);




    //console.log(JSON.parse(activeUser).username);

    // Metodo para cambiar el modo entre guardar y editar, sirve para guardar los ajustes tambien
    const changeMode = async () => {
        if (editMode) {
            try {
                let username = activeUser.username;
                // Actualizo la cookie con el nuevo valor y actualizo el user
                await updateUser(token, { username, password, email, phone, photo, bio });

                // Vuelvo a guardar los datos del usuario actualizado y a actualizar activeUser
                // TODO TERMINAR METODO DE GUARDADO PARA CONTRASEÑA Y DEMAS

            } catch (error) {
                console.error('Error actualizando el usuario: ', error);
            }
        }
        const newActiveUser = await getUserInfo(token);
        localStorage.setItem('activeUser', JSON.stringify(newActiveUser));
        activeUser = JSON.parse(localStorage.getItem("activeUser"));
        setEditMode(!editMode);

    }


    // Manejador de cambio de email
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // Manejador de cambio de contraseña
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Manejador de cambio de teléfono
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    // Manejador de cambio de foto
    const handlePhotoChange = (event) => {
        setPhoto(event.target.value);
    };

    // Manejador de cambio de bio
    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    // Manejar boton de pulsar enter para guardar
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Llamar a la función que guarda los cambios
            changeMode(); 
        }
    }
    
    // TODO procesar imagen


    // Funcion para generar la opcion
    function generateOption(awesomeIco, inputType, title, value, handleChange, placeholder) {
        const inputClass = editMode ? 'input-edit-mode' : 'input-view-mode';
        if (inputType === "file") {
            return (
                <div className="personal-info-p-rincipal-depth5-frame06">
                    <div className="personal-info-p-rincipal-depth6-frame06">
                        <div className="personal-info-p-rincipal-depth7-frame012">
                            <i className={awesomeIco}></i>
                        </div>
                    </div>
                    <div className="personal-info-p-rincipal-depth6-frame16">
                        <div className="personal-info-p-rincipal-depth7-frame013">
                            <div className="personal-info-p-rincipal-depth8-frame017">
                                <span className="personal-info-p-rincipal-text28">
                                    <span>{title}</span>
                                </span>
                            </div>
                        </div>
                        <div className="personal-info-p-rincipal-depth7-frame14">
                            <div className="personal-info-p-rincipal-depth8-frame018">
                                <span className="personal-info-p-rincipal-text30">
                                    <input
                                        type={inputType}
                                        className={`personal-info-p-rincipal-input ${inputClass}`}
                                        onChange={handleChange}
                                        accept="image/*" // Acepta cualquier tipo de imagen
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="personal-info-p-rincipal-depth5-frame06">
                    <div className="personal-info-p-rincipal-depth6-frame06">
                        <div className="personal-info-p-rincipal-depth7-frame012">
                            <i className={awesomeIco}></i>
                        </div>
                    </div>
                    <div className="personal-info-p-rincipal-depth6-frame16">
                        <div className="personal-info-p-rincipal-depth7-frame013">
                            <div className="personal-info-p-rincipal-depth8-frame017">
                                <span className="personal-info-p-rincipal-text28">
                                    <span>{title}</span>
                                </span>
                            </div>
                        </div>
                        <div className="personal-info-p-rincipal-depth7-frame14">
                            <div className="personal-info-p-rincipal-depth8-frame018">
                                <span className="personal-info-p-rincipal-text30">
                                    <input
                                        type={inputType}
                                        className={`personal-info-p-rincipal-input ${inputClass}`}
                                        value={value ? value : ""}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        readOnly={!editMode}
                                        placeholder={placeholder}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="personal-info-p-rincipal-container">
            <div className="personal-info-p-rincipal-my-profile">
                <div className="personal-info-p-rincipal-depth3-frame0">
                    <div className="personal-info-p-rincipal-depth4-frame0">
                        <div className="personal-info-p-rincipal-depth5-frame0">
                            <div className="personal-info-p-rincipal-depth6-frame0">
                                <div className="personal-info-p-rincipal-depth7-frame0">
                                    <div className="personal-info-p-rincipal-depth8-frame0">
                                        <div className="personal-info-p-rincipal-depth9-frame0">
                                            <span className="personal-info-p-rincipal-text">
                                                <span>Profile</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="personal-info-p-rincipal-depth6-frame1">
                                <div className="personal-info-p-rincipal-depth7-frame001">
                                    <div className="personal-info-p-rincipal-depth8-frame001">
                                        <div className="personal-info-p-rincipal-depth9-frame01">
                                            <span className="personal-info-p-rincipal-text02">
                                                <span>Your profile</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="personal-info-p-rincipal-depth7-frame7">
                                    <div className="personal-info-p-rincipal-depth8-frame002">
                                        <div className="personal-info-p-rincipal-depth9-frame02">
                                            <span className="personal-info-p-rincipal-text04">
                                                <span>Delete account</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="personal-info-p-rincipal-depth3-frame1">
                    <div className="personal-info-p-rincipal-depth4-frame01">
                        <div className="personal-info-p-rincipal-depth5-frame01">
                            <div className="personal-info-p-rincipal-depth6-frame01">
                                <div className="personal-info-p-rincipal-depth7-frame002">
                                    <span className="personal-info-p-rincipal-text06">
                                        <span>Your profile</span>
                                    </span>
                                </div>
                            </div>
                            <div className="personal-info-p-rincipal-depth6-frame11">
                                <div className="personal-info-p-rincipal-depth7-frame003">
                                    <span className="personal-info-p-rincipal-text08">
                                        <span>
                                            Explore Your User Management Options: Navigate Through Your User Settings.
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame1">
                        {generateOption("fa-solid fa-envelope", "email", `Email address`, email, handleEmailChange, 'Add your email')}
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame2">
                        {generateOption("fa-solid fa-key", "password", "Password", password, handlePasswordChange, 'Enter your new password')}
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame3">
                        {generateOption("fa-solid fa-phone", "text", "Phone number", phone, handlePhoneChange, 'Add your phone number')}
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame4">
                        {generateOption("fa-solid fa-user", "file", "Profile photo", photo, handlePhotoChange, 'Add a profile photo.')}
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame5">
                        {generateOption("fa-solid fa-info", "text", "Bio", bio, handleBioChange, 'Complete your profile for a better experience.')}
                    </div>
                    <div className="personal-info-p-rincipal-depth4-frame7">
                        <button onClick={changeMode} id="personal-info-button">
                            <div className="personal-info-p-rincipal-depth5-frame07">
                                <div className="personal-info-p-rincipal-depth6-frame07">
                                    <div className="personal-info-p-rincipal-depth7-frame014">
                                        <span className="personal-info-p-rincipal-text32">
                                            <span>{editMode ? 'Save' : 'Edit'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
};