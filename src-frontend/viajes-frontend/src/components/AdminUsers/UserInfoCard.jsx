import React, { useEffect, useState } from "react";
import './userInfoCard.css';
import { addUserFromAdmin, updateUser } from "../../service/userService";

export const UserInfoCard = ({ setSelectedOption, userToEdit }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    imgUrl: '',
    email: '',
    password: '',
    username: '',
    phone: '',
    bio: '',
    isAdmin: false,
    isCustomer: false
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        imgUrl: userToEdit.imgUrl,
        email: userToEdit.email,
        password: '',
        username: userToEdit.username,
        phone: userToEdit.phone ? userToEdit.phone : '',
        bio: userToEdit.bio ? userToEdit.bio : '',
        isAdmin: userToEdit.roles.includes("ADMIN"),
        isCustomer: userToEdit.roles.includes("CUSTOMER")
      })
    }
  }, [userToEdit])

  // Gestiona los cambios del texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');

  };
  function handleSubmit(e) {
    e.preventDefault();
    // Compruebo que al menos haya un rol seleccionado
    if (!(formData.isAdmin || formData.isCustomer)) {
      alert("You must select at least one role.");
      return;
    }

    if (!userToEdit) {
      // Agrego el usuario
      addUserFromAdmin(formData, formData.isAdmin, formData.isCustomer)
        .then(response => {
          setSelectedOption(1);
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    }
    else {
      // Edito el usuario
      updateUser(formData, formData.isAdmin, formData.isCustomer)
        .then(response => {
          setSelectedOption(1);
        })
        .catch(error => {
          console.error('Error updating the user:', error);
        });
    }
  }
  // Cambios en el check del rol
  const handleRoleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="user-info-card-container">
          <div className="user-info-card-user-card">
            <div className="user-info-card-attraction-info">
              <div className="user-info-card-attraction-title">
                <div className="user-info-card-depth11-frame0">
                  <span className="user-info-card-text">
                    <span>
                      <input type="text" name="username" id="username" placeholder="Username" disabled={userToEdit} value={formData.username} onChange={handleChange} style={{ width: 'auto', border: '1px solid rgb(118, 118, 118)' }} />
                    </span>
                  </span>
                </div>
              </div>
              <div className="user-info-card-attraction-data">
                <div className="user-info-card-email">
                  <span className="user-info-card-text02">
                    <span>Email</span>
                  </span>
                  <span className="user-info-card-text04">
                    <span>
                      <input type="email" name="email" id="email" placeholder="Email" required onChange={handleChange} value={formData.email} style={{ width: 'auto', border: '1px solid rgb(118, 118, 118)' }} />
                    </span>
                  </span>
                </div>
                <div className="user-info-card-password">
                  <span className="user-info-card-text06">
                    <span>Password</span>
                  </span>
                  <span className="user-info-card-text08">
                    <span>
                      <input type="text" name="password" id="password" placeholder="Password" required={!userToEdit} onChange={handleChange} value={formData.password} style={{ width: 'auto', border: '1px solid rgb(118, 118, 118)' }} />
                    </span>
                  </span>
                </div>
                <div className="user-info-card-phone">
                  <span className="user-info-card-text14">
                    <span>Phone number</span>
                  </span>
                  <span className="user-info-card-text16">
                    <span>
                      <input type="text" name="phone" id="phone" placeholder="Phone number" onChange={handleChange} value={formData.phone} />
                    </span>
                  </span>
                </div>
                <div className="user-info-card-bio">
                  <span className="user-info-card-text18">
                    <span>Biography </span>
                  </span>
                  <span className="user-info-card-text20">
                    <span>
                      <textarea type="text" name="bio" id="bio" placeholder="Biography" onChange={handleChange} value={formData.bio} />
                    </span>
                  </span>
                </div>
                <div className="user-info-card-roles" style={{ marginTop: '20px' }}>
                  ROLES <br></br>
                  <input
                    type="checkbox"
                    id="adminRole"
                    name="isAdmin"
                    checked={formData.isAdmin}
                    onChange={handleRoleChange}
                  />
                  <label htmlFor="adminRole" style={{ marginLeft: '10px' }}>ADMIN</label>
                  <br />
                  <input
                    type="checkbox"
                    id="customerRole"
                    name="isCustomer"
                    checked={formData.isCustomer}
                    onChange={handleRoleChange}
                  />
                  <label htmlFor="customerRole" style={{ marginLeft: '10px' }}>CUSTOMER</label>
                </div>

              </div>
              <div className="user-info-card-button" style={{ marginTop: '20px' }}>
                <button type="submit" className="user-info-card-depth9-frame0" style={{ position: 'relative', left: 'auto' }}>
                  <div className="user-info-card-depth10-frame0">
                    <div className="user-info-card-depth11-frame01">
                      <span className="user-info-card-text22">
                        <span>{userToEdit ? 'Save' : 'Add'}</span>
                      </span>
                    </div>
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>
      </form>
      <div className="error-messages" style={{ marginTop: '10px', color: 'red', marginLeft:'140px' }}>{errorMessage}</div>
    </div>
  )
}
