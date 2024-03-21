package com.proyecto.viajes.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.persistence.repositories.UserRepositoryI;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/users")
@AllArgsConstructor
public class UserRestController {

	private UserRepositoryI userRepository;
	private PasswordEncoder passwordEncoder;

	@Secured("ROLE_ADMIN")
	@GetMapping("/admin")
	public ResponseEntity<String> get() {
		return ResponseEntity.ok("admin!");
	}

	@Secured("ROLE_USER")
	@GetMapping("/user")
	public ResponseEntity<String> get2() {
		return ResponseEntity.ok("Usuario!");
	}

	@GetMapping
	public ResponseEntity<String> prueba() {
		return ResponseEntity.ok("Usuario!");
	}

	@PostMapping("/addUser")
	public ResponseEntity<String> addUser(@RequestBody UserEntity u) {
	    Optional<UserEntity> existingUser = userRepository.findByUsername(u.getUsername());

	    if (existingUser.isPresent()) {
	        // El usuario ya existe en la base de datos
	        return ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario ya existe");
	    } else {
	        // El usuario no existe, se puede agregar a la base de datos
	        UserEntity newUser = new UserEntity();
	        newUser.setUsername(u.getUsername());
	        newUser.setPassword(passwordEncoder.encode(u.getPassword()));
	        newUser.setEmail(u.getEmail());
	        newUser.setActive(true);
	        userRepository.save(newUser);
	        return ResponseEntity.ok("Usuario agregado exitosamente");
	    }
	}


}