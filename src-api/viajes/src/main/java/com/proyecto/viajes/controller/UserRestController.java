package com.proyecto.viajes.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.services.interfaces.UserManagementI;

@Controller
@RequestMapping("/v1/users")
public class UserRestController {

	private UserManagementI userManagementI;

	public UserRestController(UserManagementI userManagementI) {
		this.userManagementI = userManagementI;
	}
	

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
    
    

	// Endpoint para obtener todos los usuarios
	@GetMapping("/getUsers")
	public ResponseEntity<Object> getUsers() {
		try {
			List<UserEntity> users = userManagementI.findAllUsers();
			return ResponseEntity.ok(users);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al obtener usuarios: " + e.getMessage());
		}
	}

	// Endpoint para obtener un usuario por su ID
	@GetMapping("/{id}")
	public ResponseEntity<Object> getUserById(@PathVariable Long id) {
		try {
			Optional<UserEntity> user = userManagementI.findUserById(id);
			if (user.isPresent()) {
				return ResponseEntity.ok(user.get());
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al obtener usuario: " + e.getMessage());
		}
	}

	// Endpoint para agregar un nuevo usuario
	@PostMapping
	public ResponseEntity<Object> addUser(@RequestBody UserEntity user) {
		try {
			UserEntity newUser = userManagementI.addUser(user);
			return ResponseEntity.status(HttpStatus.CREATED).body("Usuario añadido correctamente\n" + newUser);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al agregar usuario: " + e.getMessage());
		}
	}


	// Endpoint para eliminar un usuario por su ID
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
		try {
			Optional<UserEntity> user = userManagementI.findUserById(id);
			if (user.isPresent()) {
				userManagementI.deleteUser(id);
				return ResponseEntity.ok("Usuario eliminado correctamente");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al eliminar usuario: " + e.getMessage());
		}
	}
}