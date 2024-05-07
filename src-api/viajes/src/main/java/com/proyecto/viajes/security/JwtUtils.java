package com.proyecto.viajes.security;

import java.sql.Date;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

/**
 * Clase utilitaria para la generación, validación y obtención de información de
 * tokens JWT.
 */
@Component
public class JwtUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtils.class);

	/**
	 * Clave secreta para la generacion
	 */
	private static final String SECRET_KEY = "h&2QKjDq^S5PZ%mL@9b!8FgUr3NtWxYp";

	/**
	 * Algoritmo de generacion.
	 */
	private static final Algorithm ALGORITHM = Algorithm.HMAC256(SECRET_KEY);

	/**
	 * Crea un token JWT para el usuario con el nombre de usuario especificado.
	 * 
	 * @param username Nombre de usuario para el cual se generará el token JWT.
	 * @return Token JWT generado.
	 */
	public String create(String username) {
		return JWT.create().withSubject(username).withIssuer("Pablo Merinas").withIssuedAt(new Date(0))
				.withExpiresAt(new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(15))).sign(ALGORITHM);
	}

	/**
	 * Verifica si un token JWT es válido.
	 * 
	 * @param jwt Token JWT a verificar.
	 * @return true si el token es válido, false si no lo es.
	 */
	public boolean isValid(String jwt) {
		try {
			JWT.require(ALGORITHM).build().verify(jwt);
			return true;
		} catch (JWTVerificationException e) {
            LOGGER.error("JwtUtils | validateJwtToken | JWT token is invalid: {}", e.getMessage());
			return false;
		}
	}

	/**
	 * Obtiene el nombre de usuario contenido en un token JWT.
	 * 
	 * @param jwt Token JWT del cual se desea obtener el nombre de usuario.
	 * @return Nombre de usuario contenido en el token JWT.
	 */
	public String getUsername(String jwt) {
		return JWT.require(ALGORITHM).build().verify(jwt).getSubject();
	}

}
