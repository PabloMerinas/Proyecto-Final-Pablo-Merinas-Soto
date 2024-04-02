package com.proyecto.viajes.security;

import com.proyecto.viajes.persistence.model.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Entidad que representa el rol de un usuario.
 */
@Entity
@Table(name = "T_USER_ROLE")
@Data
public class UserRoleEntity {

	/**
	 * ID del ROL.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * Nombre de usuario al que pertenece el rol.
	 */
	@Column(nullable = false, length = 20)
	private String username;

	/**
	 * Nombre del rol.
	 */
	@Column(nullable = false, length = 20)
	private String role;

	/**
	 * Usuario al que pertenece el ROL.
	 */
	@ManyToOne
	@JoinColumn(name = "username", referencedColumnName = "username", insertable = false, updatable = false)
	private UserEntity user;

}
