package com.proyecto.viajes.persistence.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.proyecto.viajes.security.UserRoleEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Clase UserEntity, representa la tabla usuario de la base de datos.
 */
@Data
@Entity
@Table(name = "T_USER")
public class UserEntity {

	/**
	 * Usuario.
	 */
	@Id
	@Column(nullable = false, length = 20)
	private String username;

	/**
	 * Direccion a la imagen de perfil
	 */
	private String imgUrl;

	/**
	 * Contraseña.
	 */
	@Column(nullable = false, length = 100)
	private String password;

	/**
	 * Correo electrónico.
	 */
	@Column(length = 50)
	private String email;

	/**
	 * Numero de teléfono.
	 */
	@Column(length = 50)
	private String phone;

	/**
	 * Biografia.
	 */
	@Column(length = 256)
	private String bio;

	/**
	 * Estado actual del usuario.
	 */
	@Column(nullable = false, columnDefinition = "TINYINT")
	private Boolean active;

	/**
	 * Roles del usuario
	 */
	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<UserRoleEntity> roles;
	
	
    /**
     * Notificaciones del usuario.
     */
	@JsonIgnore
    @ManyToMany(mappedBy = "userNotified")
    private List<NotificationEntity> notification;	

}
