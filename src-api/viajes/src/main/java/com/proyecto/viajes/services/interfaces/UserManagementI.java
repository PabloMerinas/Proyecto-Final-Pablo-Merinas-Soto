package com.proyecto.viajes.services.interfaces;

import java.util.Optional;

import com.proyecto.viajes.persistence.model.UserEntity;

public interface UserManagementI {

	Optional<UserEntity> findByUsername(String username);
	
	void save(UserEntity u);
}
