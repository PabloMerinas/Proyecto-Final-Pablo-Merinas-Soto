package com.proyecto.viajes.security;

import java.sql.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.proyecto.viajes.persistence.model.UserEntity;

@Component
public class JwtUtils {

	private static final String SECRET_KEY = "pablo_merinas";
	private static final Algorithm ALGORITHM = Algorithm.HMAC256(SECRET_KEY);

	public String create(String username) {
		return JWT.create().withSubject(username).withIssuer("Pablo Merinas").withIssuedAt(new Date(0))
				.withExpiresAt(new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(15))).sign(ALGORITHM);
	}

	public boolean isValid(String jwt) {
		try {
			JWT.require(ALGORITHM).build().verify(jwt);
			return true;
		} catch (JWTVerificationException e) {
			return false;
		}
	}

	public String getUsername(String jwt) {
		return JWT.require(ALGORITHM).build().verify(jwt).getSubject();
	}
	

}
