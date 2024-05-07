package com.proyecto.viajes.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.security.UserRoleEntity;

/**
 * Interfaz que define un repositorio para la entidad UserRoleEntity. Extiende
 * JpaRepository para obtener funcionalidades CRUD básicas.
 */
@Repository
public interface RoleRepositoryI extends JpaRepository<UserRoleEntity, Long> {

	/**
	 * Busca roles por nombre de usuario.
	 *
	 * @param username El nombre de usuario del cual se buscan los roles.
	 * @return Una lista de UserRoleEntity asociados al nombre de usuario
	 *         especificado.
	 */
	List<UserRoleEntity> findByUsername(String username);

	/**
	 * Elimina los roles de un usuario.
	 * 
	 * @param username Usuario del que se eliminan los roles.
	 */
	@Modifying
	@Query("DELETE FROM UserRoleEntity u WHERE u.username = :username")
	void deleteByUsername(@Param("username") String username);

}
