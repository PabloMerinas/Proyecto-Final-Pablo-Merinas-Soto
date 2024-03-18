package com.proyecto.viajes.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.proyecto.viajes.persistence.model.UserEntity;

public interface UserManagementI {

	public UserEntity addUser(UserEntity u);

	public List<UserEntity> findAllUsers();

	public Optional<UserEntity> findUserById(Long id);

	public void deleteUser(Long id);

}
