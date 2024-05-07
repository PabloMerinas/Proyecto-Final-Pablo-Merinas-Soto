package com.proyecto.viajes.security;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.dto.LoginDto;

import lombok.AllArgsConstructor;

/**
 * Controlador que maneja las operaciones de autenticación, como el inicio de
 * sesión.
 */
@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

	/**
	 * Administrador de autenticación.
	 */
	private final AuthenticationManager authenticationManager;

	/**
	 * Utilidad para la generación y validación de tokens JWT.
	 */
	private final JwtUtils jwtUtil;

	/**
	 * Endpoint para iniciar sesión.
	 *
	 * @param loginDto Objeto que contiene el nombre de usuario y la contraseña
	 *                 proporcionados por el usuario.
	 * @return ResponseEntity con un token JWT en el header de autorización.
	 */
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
		UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(loginDto.getUsername(),
				loginDto.getPassword());
		this.authenticationManager.authenticate(login);

		String jwt = this.jwtUtil.create(loginDto.getUsername());

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + jwt);

		return ResponseEntity.ok().headers(headers).body(jwt);
	}
}