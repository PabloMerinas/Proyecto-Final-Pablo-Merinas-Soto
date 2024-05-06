package com.proyecto.viajes.services.implement;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.persistence.repositories.UserRepositoryI;
import com.proyecto.viajes.services.interfaces.UserManagementI;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserManagementImpl implements UserManagementI {

	private UserRepositoryI userRepository;

	@Override
	public Optional<UserEntity> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public void save(UserEntity u) {
		userRepository.save(u);
	}

	@Override
	public List<UserEntity> findAll() {
		return userRepository.findAll();
	}

	@Override
	public Optional<UserEntity> findById(Long id) {
		return userRepository.findById(id.toString());
	}

	@Override
	public void deleteById(Long id) {
		userRepository.deleteById(id.toString());
	}

	@Override
	public void delete(UserEntity userEntity) {
		userRepository.delete(userEntity);
	}

	@Override
	public List<UserEntity> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public void saveAll(List<UserEntity> users) {
		userRepository.saveAll(users);
	}

}
