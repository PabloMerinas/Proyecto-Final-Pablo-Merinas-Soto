package com.proyecto.viajes.services.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.repositories.RoleRepositoryI;
import com.proyecto.viajes.security.UserRoleEntity;
import com.proyecto.viajes.services.interfaces.RoleManagementI;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

/**
 * Servicio que implementa la interfaz de RoleEntity.
 */
@Service
@AllArgsConstructor
public class RoleManagementImpl implements RoleManagementI {

	/**
	 * Inyección de dependencias
	 */
	private RoleRepositoryI roleRepository;

	@Override
	public List<UserRoleEntity> getAllRoles() {
		return roleRepository.findAll();
	}

	@Override
	public List<UserRoleEntity> getRolesOfUsername(String username) {
		List<UserRoleEntity> roles = roleRepository.findAll();
		List<UserRoleEntity> rolesOfUser = new ArrayList<>();

		for (UserRoleEntity userRoleEntity : roles) {
			if (userRoleEntity.getUser().getUsername().equals(username)) {
				rolesOfUser.add(userRoleEntity);
			}
		}
		return rolesOfUser;
	}

	@Override
	public void save(UserRoleEntity r) {
		roleRepository.save(r);
	}

	@Override
	@Transactional
	public void deleteRolesFromUsername(String username) {
		roleRepository.deleteRolesFromUsername(username);
	}

	@Override
	public boolean checkRoleFromUsername(String role, String username) {
		List<UserRoleEntity> roles = roleRepository.findByUsername(username);
		for (UserRoleEntity userRoleEntity : roles) {
			if (userRoleEntity.getRole().equals(role)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public void deleteById(Long id) {
		roleRepository.deleteById(id);
	}

}
