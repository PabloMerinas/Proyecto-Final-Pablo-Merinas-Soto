package com.proyecto.viajes.services.interfaces;

import java.util.List;

import com.proyecto.viajes.security.UserRoleEntity;

/**
 * Interfaz que define las operaciones de gestión de roles de usuario.
 */
public interface RoleManagementI {

	/**
	 * Obtiene todos los roles de usuario.
	 * 
	 * @return Una lista de todos los roles de usuario.
	 */
	List<UserRoleEntity> getAllRoles();

	/**
	 * Obtiene los roles de un usuario específico.
	 * 
	 * @param username El nombre de usuario del cual se obtendrán los roles.
	 * @return Una lista de los roles del usuario especificado.
	 */
	List<UserRoleEntity> getRolesOfUsername(String username);

	/**
	 * Guarda un nuevo rol de usuario.
	 * 
	 * @param r El rol de usuario a guardar.
	 */
	void save(UserRoleEntity r);

	/**
	 * Elimina todos los roles asociados a un usuario específico.
	 * 
	 * @param username El nombre de usuario del cual se eliminarán los roles.
	 */
	void deleteRolesFromUsername(String username);

}
