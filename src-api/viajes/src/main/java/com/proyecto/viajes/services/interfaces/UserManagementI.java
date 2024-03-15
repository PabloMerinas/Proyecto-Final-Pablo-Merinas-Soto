package com.proyecto.viajes.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.proyecto.viajes.persistence.model.User;

public interface UserManagementI {

	public User addUser(User u);

	public List<User> findAllUsers();

	public Optional<User> findUserById(Long id);

	public void deleteUser(Long id);

}
