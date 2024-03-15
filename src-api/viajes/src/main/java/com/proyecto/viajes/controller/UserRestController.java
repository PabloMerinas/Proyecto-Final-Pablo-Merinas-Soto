package com.proyecto.viajes.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.proyecto.viajes.persistence.model.User;
import com.proyecto.viajes.services.interfaces.UserManagementI;

@Controller
@RequestMapping("/v1/user")
public class UserRestController {

	private UserManagementI userManagementI;

	public UserRestController(UserManagementI userManagementI) {
		this.userManagementI = userManagementI;
	}

	@GetMapping
	public ResponseEntity<Object> get() {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Funciona ");
	}

	// Endpoint para obtener todos los usuarios
	@GetMapping("/getUsers")
	public ResponseEntity<Object> getUsers() {
		try {
			List<User> users = userManagementI.findAllUsers();
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
			Optional<User> user = userManagementI.findUserById(id);
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
	public ResponseEntity<Object> addUser(@RequestBody User user) {
		try {
			User newUser = userManagementI.addUser(user);
			return ResponseEntity.status(HttpStatus.CREATED).body("Usuario añadido correctamente\n" + newUser);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al agregar usuario: " + e.getMessage());
		}
	}

	// Endpoint para actualizar un usuario existente
	@PutMapping("/{id}")
	public ResponseEntity<Object> updateUser(@PathVariable Long id, @RequestBody User user) {
		try {
			Optional<User> existingUser = userManagementI.findUserById(id);
			if (existingUser.isPresent()) {
				user.setIdUser(id);
				User updatedUser = userManagementI.addUser(user);
				return ResponseEntity.ok(updatedUser);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al actualizar usuario: " + e.getMessage());
		}
	}

	// Endpoint para eliminar un usuario por su ID
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
		try {
			Optional<User> user = userManagementI.findUserById(id);
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
