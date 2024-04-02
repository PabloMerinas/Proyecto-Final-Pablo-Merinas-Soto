package com.proyecto.viajes.services.interfaces;

import java.util.List;
import java.util.Optional;

import com.proyecto.viajes.persistence.model.UserEntity;

/**
 * Interfaz que define las operaciones de gestión de usuarios.
 */
public interface UserManagementI {

	/**
	 * Busca un usuario por su nombre de usuario.
	 * 
	 * @param username El nombre de usuario a buscar.
	 * @return Un Optional que puede contener al usuario si se encuentra, o vacío si
	 *         no se encuentra.
	 */
	Optional<UserEntity> findByUsername(String username);

	/**
	 * Guarda un usuario en la base de datos.
	 * 
	 * @param u El usuario a guardar.
	 */
	void save(UserEntity u);

	/**
	 * Elimina un usuario por su ID.
	 * 
	 * @param id El ID del usuario a eliminar.
	 */
	void deleteById(Long id);

	/**
	 * Elimina un usuario.
	 * 
	 * @param userEntity El usuario a eliminar.
	 */
	void delete(UserEntity userEntity);

	/**
	 * Busca un usuario por su ID.
	 * 
	 * @param id El ID del usuario a buscar.
	 * @return Un Optional que puede contener al usuario si se encuentra, o vacío si
	 *         no se encuentra.
	 */
	Optional<UserEntity> findById(Long id);

	/**
	 * Obtiene todos los usuarios.
	 * 
	 * @return Una lista de todos los usuarios.
	 */
	List<UserEntity> findAll();
}
