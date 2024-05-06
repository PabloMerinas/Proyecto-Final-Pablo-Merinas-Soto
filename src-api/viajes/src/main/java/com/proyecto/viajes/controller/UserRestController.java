package com.proyecto.viajes.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.persistence.model.VisitedPlaceEntity;
import com.proyecto.viajes.security.JwtUtils;
import com.proyecto.viajes.security.UserRoleEntity;
import com.proyecto.viajes.services.implement.RoleManagementImpl;
import com.proyecto.viajes.services.implement.UserManagementImpl;
import com.proyecto.viajes.services.implement.VisitedPlaceManagementImpl;

import lombok.AllArgsConstructor;

/**
 * Clase controladora de la API para manejar las operaciones relacionadas con
 * los usuarios.
 */
@RestController
@RequestMapping("/v1/user")
@AllArgsConstructor
public class UserRestController {

	/**
	 * Inyección de dependencia de UserManagementImpl.
	 */
	private UserManagementImpl userRepository;

	/**
	 * Inyección de dependencia de RoleManagementImpl.
	 */
	private RoleManagementImpl roleRepository;

	/**
	 * Inyección de dependencia de PasswordEncoder.
	 */
	private PasswordEncoder passwordEncoder;

	/**
	 * Inyección de dependencia de JwtUtils.
	 */
	private JwtUtils jwtUtils;

	/**
	 * Inyeccion de dependencia de visitedPlace.
	 */
	private VisitedPlaceManagementImpl visitedPlaceRepository;

	/**
	 * Metodo por defecto GET, devuelve la lista de todos los usuarios.
	 * 
	 * @return Lista con todos los usuarios
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping
	public List<UserEntity> getAllUsers() {
		return userRepository.findAll();
	}

	/**
	 * Endpoint para agregar un nuevo usuario.
	 * 
	 * @return ResponseEntity con un mensaje indicando el resultado de la operación.
	 */
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

			String jwt = jwtUtils.create(u.getUsername());
			HttpHeaders headers = new HttpHeaders();

			// Le agrego el rol por defecto: CUSTOMER
			UserRoleEntity customer = new UserRoleEntity();
			customer.setUsername(u.getUsername());
			customer.setRole("CUSTOMER");
			roleRepository.save(customer);

			// Devuelvo en el header el token, asi al registrar y acceder ya tiene
			// identificado el usuario
			return ResponseEntity.ok().headers(headers).body(jwt);
		}
	}

	@PostMapping("/addUserFromAdmin")
	public ResponseEntity<String> addUserFromAdmin(@RequestBody UserEntity u, @RequestParam boolean isAdmin,
			@RequestParam boolean isCustomer) {
		Optional<UserEntity> existingUser = userRepository.findByUsername(u.getUsername());

		if (existingUser.isPresent()) {
			// El usuario ya existe en la base de datos
			return ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario ya existe");
		} else {
			UserEntity newUser = new UserEntity();
			newUser.setUsername(u.getUsername());
			newUser.setPassword(passwordEncoder.encode(u.getPassword()));
			newUser.setEmail(u.getEmail());
			newUser.setActive(true);
			userRepository.save(newUser);

			String jwt = jwtUtils.create(u.getUsername());
			HttpHeaders headers = new HttpHeaders();

			// Le agrego el rol que le paso
			if (isCustomer) {
				UserRoleEntity customer = new UserRoleEntity();
				customer.setUsername(u.getUsername());
				customer.setRole("CUSTOMER");
				roleRepository.save(customer);
			}
			if (isAdmin) {
				UserRoleEntity admin = new UserRoleEntity();
				admin.setUsername(u.getUsername());
				admin.setRole("ADMIN");
				roleRepository.save(admin);
			}

			return ResponseEntity.ok().body("Usuario añadido correctamente");
		}

	}

	/**
	 * Endpoint para recuperar un usuario pasandole un token. Se requiere el rol de:
	 * "ROLE_CUSTOMER", "ROLE_ADMIN"
	 * 
	 * @param token Token del usuario.
	 * @return Usuario recuperado.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getUserByToken")
	public UserEntity getUserByToken(@RequestParam String token) {
		String username = jwtUtils.getUsername(token);
		Optional<UserEntity> userOptional = userRepository.findByUsername(username);
		UserEntity finalUser = new UserEntity();
		if (userOptional.isPresent()) {
			finalUser.setUsername(username);
			finalUser.setImgUrl(userOptional.get().getImgUrl());
			finalUser.setPassword(userOptional.get().getPassword());
			finalUser.setEmail(userOptional.get().getEmail());
			finalUser.setPhone(userOptional.get().getPhone());
			finalUser.setBio(userOptional.get().getBio());
			finalUser.setActive(userOptional.get().getActive());

		} else {
			throw new NoSuchElementException("Usuario no encontrado para el token proporcionado");
		}

		return finalUser;
	}

	/**
	 * Endpoint para recuperar los roles de un usuario por su token. Se requiere el
	 * rol de: "ROLE_CUSTOMER", "ROLE_ADMIN"
	 * 
	 * @param token Token del usuario.
	 * @return Lista de roles del usuario.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getRolesByToken")
	public List<String> getRolesByToken(@RequestParam String token) {
		List<String> roles = new ArrayList<>();

		// Buscar el usuario por el nombre de usuario
		Optional<UserEntity> userOptional = userRepository.findByUsername(jwtUtils.getUsername(token));

		if (userOptional.isPresent()) {
			UserEntity user = userOptional.get();

			// Obtener los roles del usuario
			List<UserRoleEntity> userRoles = roleRepository.getRolesOfUsername(user.getUsername());

			// Agregar los roles a la lista
			for (UserRoleEntity userRole : userRoles) {
				roles.add(userRole.getRole());
			}
		}

		return roles;
	}

	/**
	 * Endpoint para recuperar los roles de un usuario por su usuario. Se requiere
	 * el rol de: "ROLE_CUSTOMER", "ROLE_ADMIN"
	 * 
	 * @param username Usuario del usuario.
	 * @return Lista de los roles del usuario.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getRolesByUsername")
	public List<String> getRolesByUsername(@RequestParam String username) {
		List<String> roles = new ArrayList<>();

		// Buscar el usuario por el nombre de usuario
		Optional<UserEntity> userOptional = userRepository.findByUsername(username);

		if (userOptional.isPresent()) {
			UserEntity user = userOptional.get();

			// Obtener los roles del usuario
			List<UserRoleEntity> userRoles = roleRepository.getRolesOfUsername(user.getUsername());

			// Agregar los roles a la lista
			for (UserRoleEntity userRole : userRoles) {
				roles.add(userRole.getRole());
			}
		}

		return roles;
	}

	/**
	 * Endpoint para actualizar un usuario. Se requiere el rol de: "ROLE_CUSTOMER",
	 * "ROLE_ADMIN"
	 * 
	 * @param updatedUser Usuario con los datos actualizados.
	 * @param isAdmin Determina el rol de admin.
	 * @param isCustomer Determina el rol de customer.
	 * @return RespondeEntity con la respuesta de la operación.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@PutMapping
	public ResponseEntity<String> updateUser(@RequestBody UserEntity updatedUser, @RequestParam boolean isAdmin,
			@RequestParam boolean isCustomer) {
		Optional<UserEntity> existingUserOptional = userRepository.findByUsername(updatedUser.getUsername());

		if (existingUserOptional.isPresent()) {
			UserEntity existingUser = existingUserOptional.get();

			// Actualizar la información del usuario
			existingUser.setEmail(updatedUser.getEmail());
			existingUser.setPhone(updatedUser.getPhone());
			existingUser.setBio(updatedUser.getBio());

			// Verificar si se proporcionó una nueva contraseña
			if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
				// Codificar y guardar la nueva contraseña
				existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
			}

			
			// Elimino primero los roles asociados a ese usuario
			roleRepository.deleteRolesFromUsername(existingUser.getUsername());
			//PRUEBAS
			// ELiminar rol por id
			
			
			System.out.println("ADMIN:" + roleRepository.checkRoleFromUsername("ADMIN",existingUser.getUsername()));
			System.out.println("CUSTOMER:" + roleRepository.checkRoleFromUsername("CUSTOMER",existingUser.getUsername()));
//			// Agregar roles si corresponde
			if (isCustomer && !roleRepository.checkRoleFromUsername("CUSTOMER", updatedUser.getUsername())) {
				System.out.println("Añade customer");
				UserRoleEntity customer = new UserRoleEntity();
				customer.setUsername(updatedUser.getUsername());
				customer.setRole("CUSTOMER");
				roleRepository.save(customer);
			}
			if (isAdmin && !roleRepository.checkRoleFromUsername("ADMIN", updatedUser.getUsername())) {
				System.out.println("Añade admin");
				UserRoleEntity admin = new UserRoleEntity();
				admin.setUsername(updatedUser.getUsername());
				admin.setRole("ADMIN");
				roleRepository.save(admin);
			}

			// Guardar los cambios
			userRepository.save(existingUser);

			return ResponseEntity.ok().body("Usuario actualizado correctamente");
		} else {
			// Usuario no encontrado
			return ResponseEntity.notFound().build();
		}
	}

	/**
	 * Endpoint para actualizar un usuario por su username. Se requiere el rol de:
	 * "ROLE_CUSTOMER", "ROLE_ADMIN"
	 * 
	 * @param username    Usuario del usuario.
	 * @param updatedUser Usuario con los datos actualizados.
	 * @return ResponseEntity con la respuesta de la oparación.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@PutMapping("/updateByUsername")
	public ResponseEntity<String> updateUserByUsername(@RequestParam String username,
			@RequestBody UserEntity updatedUser) {
		Optional<UserEntity> existingUserOptional = userRepository.findByUsername(username);

		if (existingUserOptional.isPresent()) {
			UserEntity existingUser = existingUserOptional.get();

			// Actualizar la información del usuario
			existingUser.setEmail(updatedUser.getEmail());
			existingUser.setPhone(updatedUser.getPhone());
			existingUser.setBio(updatedUser.getBio());

			// Verificar si se proporcionó una nueva contraseña
			if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
				// Codificar y guardar la nueva contraseña
				existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
			}

			// Guardar los cambios
			userRepository.save(existingUser);

			return ResponseEntity.ok().body("Usuario actualizado correctamente");
		} else {
			// Usuario no encontrado
			return ResponseEntity.notFound().build();
		}
	}

	/**
	 * Endpoint para eliminar un usuario por su nombre de usuario. Se requiere el
	 * rol de: "ROLE_ADMIN"
	 * 
	 * @param username Nombre de usuario del usuario a eliminar.
	 * @return ResponseEntity con la respuesta del servidor.
	 */
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/deleteUserByUsername/{username}")
	public ResponseEntity<String> deleteUserByUsername(@PathVariable String username) {
		Optional<UserEntity> userOptional = userRepository.findByUsername(username);

		if (userOptional.isPresent()) {
			// Eliminar los roles asociados a ese usuario
			roleRepository.deleteRolesFromUsername(username);

			// Elimina sus lugares visitados
			UserEntity user = userOptional.get();
			List<VisitedPlaceEntity> visitedPlacesToDelete = visitedPlaceRepository.findByUser(user);
			// Eliminar la relación entre los lugares visitados y la atracción
			for (VisitedPlaceEntity visitedPlace : visitedPlacesToDelete) {
				visitedPlace.setUser(null);
				visitedPlaceRepository.save(visitedPlace);
			}

			// Eliminar al usuario
			userRepository.delete(userOptional.get());

			return ResponseEntity.ok().body("Usuario eliminado correctamente");
		} else {
			// Si el usuario no existe, devolver la respuesta
			return ResponseEntity.notFound().build();
		}
	}

	/**
	 * Endpoint para eliminar un usuario Se requiere el rol de: "ROLE_CUSTOMER",
	 * "ROLE_ADMIN"
	 * 
	 * @param username Username del usuario a eliminar.
	 * @return RespondeEntity con la respuesta del servidor.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@DeleteMapping("/deleteMyUser")
	public ResponseEntity<String> deleteMyUser(@RequestParam String username) {
		try {
			// Buscar al usuario por su nombre de usuario en la base de datos
			Optional<UserEntity> userOptional = userRepository.findByUsername(username);
			if (userOptional.isPresent()) {
				// Elimino primero los roles asociados a ese usuario
				roleRepository.deleteRolesFromUsername(username);

				// Si el usuario existe, eliminarlo
				userRepository.delete(userOptional.get());
				return ResponseEntity.ok().body("Usuario eliminado correctamente");
			} else {
				// Si el usuario no existe, devolver la respuesta
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			// Maneor la excepción
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Se produjo un error al eliminar el usuario");
		}
	}

	/**
	 * Endpoint para eliminar un usuario. Se requiere el rol de: "ROLE_ADMIN"
	 * 
	 * @param user Usuario a eliminar en formato JSON.
	 * @return ResponseEntity con la respuesta del servidor.
	 */
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/deleteUser")
	public ResponseEntity<String> deleteUser(@RequestBody UserEntity user) {
		try {
			Optional<UserEntity> existingUser = userRepository.findByUsername(user.getUsername());

			if (existingUser.isPresent()) {
				// Eliminar los roles asociados a ese usuario
				roleRepository.deleteRolesFromUsername(user.getUsername());

				// Eliminar al usuario
				userRepository.delete(existingUser.get());

				return ResponseEntity.ok().body("Usuario eliminado correctamente");
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Se produjo un error al eliminar el usuario");
		}
	}

}