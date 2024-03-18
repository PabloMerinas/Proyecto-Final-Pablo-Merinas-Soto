package com.proyecto.viajes.security;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.dto.LoginDto;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtil;

	@PostMapping("/login")
	public ResponseEntity<Void> login(@RequestBody LoginDto loginDto) {
		UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(loginDto.getUsername(),
				loginDto.getPassword());
		Authentication authentication = this.authenticationManager.authenticate(login);

		System.out.println(authentication.isAuthenticated());
		System.out.println(authentication.getPrincipal());

		String jwt = this.jwtUtil.create(loginDto.getUsername());
		return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwt).build();
	}
}