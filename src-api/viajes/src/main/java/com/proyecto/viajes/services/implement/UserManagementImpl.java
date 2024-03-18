package com.proyecto.viajes.services.implement;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.persistence.repositories.UserRepositoryI;
import com.proyecto.viajes.services.interfaces.UserManagementI;

@Service
public class UserManagementImpl implements UserManagementI {

	private UserRepositoryI userRepositoryI;

	public UserManagementImpl(UserRepositoryI userRepositoryI) {
		this.userRepositoryI = userRepositoryI;
	}

	@Override
	public UserEntity addUser(UserEntity u) {
		userRepositoryI.save(u);
		return u;
	}

	@Override
	public List<UserEntity> findAllUsers() {
		return userRepositoryI.findAll();
	}

	@Override
	public Optional<UserEntity> findUserById(Long id) {
		return userRepositoryI.findById(id);
	}

	@Override
	public void deleteUser(Long id) {
		userRepositoryI.deleteById(id);
	}

}
