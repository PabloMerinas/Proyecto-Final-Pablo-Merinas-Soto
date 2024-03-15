package com.proyecto.viajes.services.implement;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.User;
import com.proyecto.viajes.persistence.repositories.UserRepositoryI;
import com.proyecto.viajes.services.interfaces.UserManagementI;

@Service
public class UserManagementImpl implements UserManagementI {

	private UserRepositoryI userRepositoryI;

	public UserManagementImpl(UserRepositoryI userRepositoryI) {
		this.userRepositoryI = userRepositoryI;
	}

	@Override
	public User addUser(User u) {
		userRepositoryI.save(u);
		return u;
	}

	@Override
	public List<User> findAllUsers() {
		return userRepositoryI.findAll();
	}

	@Override
	public Optional<User> findUserById(Long id) {
		return userRepositoryI.findById(id);
	}

	@Override
	public void deleteUser(Long id) {
		userRepositoryI.deleteById(id);
	}

}
