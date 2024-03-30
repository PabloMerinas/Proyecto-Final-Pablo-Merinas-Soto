import React, { useState, useEffect } from 'react';
import { useAuth } from "../../authContext/autContext";
import { Navigate } from "react-router-dom";
import { getAllUsers } from '../../service/userService';
import './adminUsers.css';

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    // Comprobamos que este logeado
    const { activeUser } = useAuth();

    // Recupero los usuarios
    useEffect(() => {
        async function fetchUsers() {
            try {
                // Recupero el token
                const token = localStorage.getItem("authToken");
                const usersData = await getAllUsers(token);
                setUsers(usersData);
                setFilteredUsers(usersData);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        }
        fetchUsers();
    }, []);
    console.log(users);

    if (!activeUser) {
        return <Navigate to="/" />;

    }

    const handleInputChange = (event) => {
        setSearchText(event.target.value || '');
        filterUsers(event.target.value || ''); // Llamo al metodo para filtrar ( Lo dejo aqui para que se vaya actualizando solo)

    };
    // Metodo para filtrar usuarios
    const filterUsers = (text) => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <div className="users-principal-container">
            <div className="users-principal-users">
                <div className="users-principal-nivel4-frame0">
                    <div className="users-principal-nivel5-frame0">
                        <div className="users-principal-nivel6-frame0">
                            <span className="users-principal-text">
                                <span>Users</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="users-principal-nivel4-frame1">
                    <div className="users-principal-nivel5-frame01">
                        <div className="users-principal-nivel6-frame01">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="users-principal-nivel6-frame1">
                            <div className="users-principal-nivel7-frame01">
                                <span className="users-principal-text02">
                                    <input
                                        type="text"
                                        value={searchText}
                                        onChange={handleInputChange}
                                        placeholder="Buscar usuarios" style={{ backgroundColor: 'transparent', width: '860px', border: 'none' }}
                                    /> </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="users-principal-nivel4-frame2">
                    <div className="users-principal-nivel5-frame02">
                        <div className="users-principal-nivel6-frame02">
                            <div className="users-principal-nivel7-frame02">
                                <div className="users-principal-nivel8-frame0">
                                    <div className="users-principal-nivel9-frame0">
                                        <div className="users-principal-nivel10-frame0">
                                            <span className="users-principal-text04">
                                                <span>Image</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="users-principal-nivel9-frame0">
                                        <div className="users-principal-nivel10-frame0">
                                            <span className="users-principal-text04">
                                                <span>Email</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="users-principal-nivel9-frame1">
                                        <div className="users-principal-nivel10-frame001">
                                            <span className="users-principal-text06">
                                                <span>Username</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="users-principal-nivel9-frame2">
                                        <div className="users-principal-nivel10-frame002">
                                            <span className="users-principal-text08">
                                                <span>Password</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="users-principal-nivel9-frame3">
                                        <div className="users-principal-nivel10-frame003">
                                            <span className="users-principal-text10">
                                                <span>Roles</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="users-principal-nivel9-frame4">
                                        <div className="users-principal-nivel10-frame004">
                                            <span className="users-principal-text12">
                                                <span>Phone</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="users-principal-nivel9-frame5">
                                        <div className="users-principal-nivel10-frame005">
                                            <span className="users-principal-text14">
                                                <span>Info</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="users-principal-nivel7-frame1">
                                {filteredUsers.map(user => (
                                    <form key={user.username}>
                                        {generateUser(user.imgUrl ,user.email, user.username, 'pass', user.roles, user.phone)}
                                    </form>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

// Metodo para generar la linea del pais y llamar a su tarjeta con la información
function generateUser(image, email, username, password, roles, phone) {

    return (
        <div className="users-principal-nivel8-frame01">
            <div className="users-principal-nivel9-frame01 ">
                <div className="users-principal-text199">
                    <span className="users-principal-text199">
                        <span>
                            <img className='admin-user-profile-img' src={image} alt='Profile'></img></span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame01">
                <div className="users-principal-nivel10-frame006">
                    <span className="users-principal-text16">
                        <span>{email ? email : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame11">
                <div className="users-principal-nivel10-frame007">
                    <span className="users-principal-text18">
                        <span>{username ? username : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame21">
                <div className="users-principal-nivel10-frame008">
                    <span className="users-principal-text20">
                        <span>{password ? password : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame31">
                <div className="users-principal-nivel10-frame009">
                    <span className="users-principal-text22">{roles ? roles.join(', ') : 'default'}</span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame41">
                <div className="users-principal-nivel10-frame010">
                    <span className="users-principal-text23">
                        <span>{phone ? phone : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame51">
                <div className="users-principal-nivel10-frame011">
                    <div className="users-principal-nivel11-frame0">
                        <div className="users-principal-nivel12-frame0">
                            <span className="users-principal-text25">
                                <span>Show</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}