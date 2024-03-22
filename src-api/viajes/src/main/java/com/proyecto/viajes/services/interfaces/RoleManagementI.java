package com.proyecto.viajes.services.interfaces;

import java.util.List;

import com.proyecto.viajes.security.UserRoleEntity;

public interface RoleManagementI {

	List<UserRoleEntity> getAllRoles();
	List<UserRoleEntity> getRolesOfUsername(String username);
	void save(UserRoleEntity r);
}
