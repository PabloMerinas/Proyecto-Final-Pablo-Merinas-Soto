package com.proyecto.viajes.services.interfaces;

import java.util.Optional;

import com.proyecto.viajes.persistence.model.UserEntity;

public interface UserManagementI {

	Optional<UserEntity> findUserByUsername(String username);
	
	void save(UserEntity u);
}
