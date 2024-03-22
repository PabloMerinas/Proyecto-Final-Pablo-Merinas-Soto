package com.proyecto.viajes.controller;

import java.util.List;
import java.util.NoSuchElementException;
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
import com.proyecto.viajes.security.JwtUtils;
import com.proyecto.viajes.security.UserRoleEntity;
import com.proyecto.viajes.services.implement.UserManagementImpl;
import com.proyecto.viajes.services.interfaces.RoleManagementI;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/users")
@AllArgsConstructor
public class UserRestController {

	private UserManagementImpl userRepository;
	private RoleManagementI roleRepository;

	private PasswordEncoder passwordEncoder;
	private JwtUtils jwtUtils;

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
		Optional<UserEntity> existingUser = userRepository.findUserByUsername(u.getUsername());

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

	// @Secured({ "ROLE_USER", "ROLE_ADMIN" })
	@GetMapping("/getUserByToken")
	public UserEntity getUserByToken(String token) {
		String username = jwtUtils.getUsername(token);
		Optional<UserEntity> userOptional = userRepository.findUserByUsername(username);
		UserEntity finalUser = new UserEntity();
		if (userOptional.isPresent()) {
			finalUser.setUsername(username);
			finalUser.setActive(userOptional.get().getActive());
			finalUser.setEmail(userOptional.get().getEmail());
			finalUser.setBio(userOptional.get().getBio());
			finalUser.setPassword(userOptional.get().getPassword());
			finalUser.setPhone(userOptional.get().getPhone());
			
			List<UserRoleEntity> rol = roleRepository.getRolesOfUsername(username);
			for (UserRoleEntity userRoleEntity : rol) {
				System.out.println(userRoleEntity.getRole());
			}

		} else {
			throw new NoSuchElementException("Usuario no encontrado para el token proporcionado");
		}

		return finalUser;
	}

}