package com.proyecto.viajes.persistence.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.UserEntity;

/**
 * Interfaz que define un repositorio para la entidad de usuarios (UserEntity).
 */
@Repository
public interface UserRepositoryI extends JpaRepository<UserEntity, String> {

	/**
	 * Busca un usuario por su dirección de correo electrónico.
	 *
	 * @param email La dirección de correo electrónico del usuario a buscar.
	 * @return Un Optional que puede contener al usuario encontrado, o vacío si no
	 *         se encontró.
	 */
	Optional<UserEntity> findOneByEmail(String email);

	/**
	 * Busca un usuario por su nombre de usuario.
	 *
	 * @param username El nombre de usuario del usuario a buscar.
	 * @return Un Optional que puede contener al usuario encontrado, o vacío si no
	 *         se encontró.
	 */
	Optional<UserEntity> findByUsername(String username);

}
