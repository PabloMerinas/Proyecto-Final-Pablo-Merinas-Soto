import React, { useState } from "react";
import './personalInfo.css'
import { updateUser } from "../../service/userService";
import { deleteMyUser } from "../../service/userService";
import { useAuth } from '../../authContext/autContext';
import { Navigate } from 'react-router-dom';


export const PersonalInfo = () => {
    const { activeUser, logout } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState(activeUser ? activeUser.email : '');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(activeUser ? activeUser.phone : '');
    const [photo, setPhoto] = useState();
    const [bio, setBio] = useState(activeUser ? activeUser.bio : '');

    if (!activeUser) {
        return <Navigate to="/" />;

    }
    // Traigo al usuario actual
    const token = localStorage.getItem("authToken");
    // Defino las variables y sus valores por defecto


    // Metodo para cambiar el modo entre guardar y editar, sirve para guardar los ajustes tambien
    const changeMode = async () => {
        if (editMode) {
            try {
                let username = activeUser.username;
                // Actualizo la cookie con el nuevo valor y actualizo el user
                await updateUser(token, { username, password, email, phone, photo, bio });

            } catch (error) {
                console.error('Error actualizando el usuario: ', error);
            }
        }
        // const newActiveUser = await getUserInfo(token);
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
                <div className="personal-info-principal-nivel5-frame06">
                    <div className="personal-info-principal-nivel6-frame06">
                        <div className="personal-info-principal-nivel7-frame012">
                            <i className={awesomeIco}></i>
                        </div>
                    </div>
                    <div className="personal-info-principal-nivel6-frame16">
                        <div className="personal-info-principal-nivel7-frame013">
                            <div className="personal-info-principal-nivel8-frame017">
                                <span className="personal-info-principal-text28">
                                    <span>{title}</span>
                                </span>
                            </div>
                        </div>
                        <div className="personal-info-principal-nivel7-frame14">
                            <div className="personal-info-principal-nivel8-frame018">
                                <span className="personal-info-principal-text30">
                                    <input
                                        type={inputType}
                                        className={`personal-info-principal-input ${inputClass}`}
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
                <div className="personal-info-principal-nivel5-frame06">
                    <div className="personal-info-principal-nivel6-frame06">
                        <div className="personal-info-principal-nivel7-frame012">
                            <i className={awesomeIco}></i>
                        </div>
                    </div>
                    <div className="personal-info-principal-nivel6-frame16">
                        <div className="personal-info-principal-nivel7-frame013">
                            <div className="personal-info-principal-nivel8-frame017">
                                <span className="personal-info-principal-text28">
                                    <span>{title}</span>
                                </span>
                            </div>
                        </div>
                        <div className="personal-info-principal-nivel7-frame14">
                            <div className="personal-info-principal-nivel8-frame018">
                                <span className="personal-info-principal-text30">
                                    <input
                                        type={inputType}
                                        className={`personal-info-principal-input ${inputClass}`}
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

    // Función para manejar el clic en Delete account
    const handleDeleteAccount = async () => {
        
        // Muestro el popup
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");

        // Si el usuario confirma la eliminación
        if (confirmDelete) {
            try {
                // Elimino el usuario actual
                await deleteMyUser(activeUser.username, token);
                // Muestro un mensaje de confirmación
                logout(); // Desconecto al usuario, por ende se redirecciona al inicio '/'
                window.confirm('Usuario ' + activeUser.username + ' eliminado');
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        }
    };


    return (
        <div className="personal-info-principal-container">
            <div className="personal-info-principal-my-profile">
                <div className="personal-info-principal-nivel3-frame0">
                    <div className="personal-info-principal-nivel4-frame0">
                        <div className="personal-info-principal-nivel5-frame0">
                            <div className="personal-info-principal-nivel6-frame0">
                                <div className="personal-info-principal-nivel7-frame0">
                                    <div className="personal-info-principal-nivel8-frame0">
                                        <div className="personal-info-principal-nivel9-frame0">
                                            <span className="personal-info-principal-text">
                                                <span>Profile</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="personal-info-principal-nivel6-frame1">
                                <div className="personal-info-principal-nivel7-frame001">
                                    <div className="personal-info-principal-nivel8-frame001">
                                        <div className="personal-info-principal-nivel9-frame01">
                                            <span className="personal-info-principal-text02">
                                                <span>Your profile</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="personal-info-principal-nivel7-frame7" onClick={handleDeleteAccount}>
                                    <div className="personal-info-principal-nivel8-frame002">
                                        <div className="personal-info-principal-nivel9-frame02">
                                            <span className="personal-info-principal-text04">
                                                <span>Delete account</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="personal-info-principal-nivel3-frame1">
                    <div className="personal-info-principal-nivel4-frame01">
                        <div className="personal-info-principal-nivel5-frame01">
                            <div className="personal-info-principal-nivel6-frame01">
                                <div className="personal-info-principal-nivel7-frame002">
                                    <span className="personal-info-principal-text06">
                                        <span>Your profile</span>
                                    </span>
                                </div>
                            </div>
                            <div className="personal-info-principal-nivel6-frame11">
                                <div className="personal-info-principal-nivel7-frame003">
                                    <span className="personal-info-principal-text08">
                                        <span>
                                            Explore Your User Management Options: Navigate Through Your User Settings.
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="personal-info-principal-nivel4-frame1">
                        {generateOption("fa-solid fa-envelope", "email", `Email address`, email, handleEmailChange, 'Add your email')}
                    </div>
                    <div className="personal-info-principal-nivel4-frame2">
                        {generateOption("fa-solid fa-key", "password", "Password", password, handlePasswordChange, 'Enter your new password')}
                    </div>
                    <div className="personal-info-principal-nivel4-frame3">
                        {generateOption("fa-solid fa-phone", "text", "Phone number", phone, handlePhoneChange, 'Add your phone number')}
                    </div>
                    <div className="personal-info-principal-nivel4-frame4">
                        {generateOption("fa-solid fa-user", "file", "Profile photo", photo, handlePhotoChange, 'Add a profile photo.')}
                    </div>
                    <div className="personal-info-principal-nivel4-frame5">
                        {generateOption("fa-solid fa-info", "text", "Bio", bio, handleBioChange, 'Complete your profile for a better experience.')}
                    </div>
                    <div className="personal-info-principal-nivel4-frame7">
                        <button onClick={changeMode} id="personal-info-button">
                            <div className="personal-info-principal-nivel5-frame07">
                                <div className="personal-info-principal-nivel6-frame07">
                                    <div className="personal-info-principal-nivel7-frame014">
                                        <span className="personal-info-principal-text32">
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