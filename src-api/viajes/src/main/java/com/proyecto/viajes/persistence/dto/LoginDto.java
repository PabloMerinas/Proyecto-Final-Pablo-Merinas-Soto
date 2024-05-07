package com.proyecto.viajes.persistence.dto;

import lombok.Data;

@Data
/**
 * Clase DTO para gestionar el Login
 */
public class LoginDto {

	/**
	 * Usuario.
	 */
	private String username;

	/**
	 * Contraseña.
	 */
	private String password;
}
