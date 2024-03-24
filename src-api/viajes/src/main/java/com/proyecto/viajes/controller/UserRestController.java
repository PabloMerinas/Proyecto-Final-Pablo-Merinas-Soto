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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.security.JwtUtils;
import com.proyecto.viajes.security.UserRoleEntity;
import com.proyecto.viajes.services.implement.RoleManagementImpl;
import com.proyecto.viajes.services.implement.UserManagementImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/user")
@AllArgsConstructor
public class UserRestController {

	private UserManagementImpl userRepository;
	private RoleManagementImpl roleRepository;

	private PasswordEncoder passwordEncoder;
	private JwtUtils jwtUtils;

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

	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getUserByToken")
	public UserEntity getUserByToken(@RequestParam String token) {
		String username = jwtUtils.getUsername(token);
		Optional<UserEntity> userOptional = userRepository.findUserByUsername(username);
		UserEntity finalUser = new UserEntity();
		if (userOptional.isPresent()) {
			finalUser.setUsername(username);
			finalUser.setImgUrl(userOptional.get().getImgUrl());
			finalUser.setPassword(userOptional.get().getPassword());
			finalUser.setEmail(userOptional.get().getEmail());
			finalUser.setPhone(userOptional.get().getPhone());
			finalUser.setBio(userOptional.get().getBio());
			finalUser.setActive(userOptional.get().getActive());

//			List<UserRoleEntity> rol = roleRepository.getRolesOfUsername(username);
//			for (UserRoleEntity userRoleEntity : rol) {
//				System.err.println("ROL " + userRoleEntity.getRole());
//			}

		} else {
			throw new NoSuchElementException("Usuario no encontrado para el token proporcionado");
		}

		return finalUser;
	}

	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getRolesByToken")
	public List<String> getRolesByToken(@RequestParam String token) {
		List<String> roles = new ArrayList<>();

		// Buscar el usuario por el nombre de usuario
		Optional<UserEntity> userOptional = userRepository.findUserByUsername(jwtUtils.getUsername(token));

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

	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@PutMapping
	public ResponseEntity<String> updateUser(@RequestBody UserEntity updatedUser) {
		Optional<UserEntity> existingUserOptional = userRepository.findUserByUsername(updatedUser.getUsername());

		if (existingUserOptional.isPresent()) {
			UserEntity existingUser = existingUserOptional.get();

			// Actualizar la información del usuario
			existingUser.setEmail(updatedUser.getEmail());
			existingUser.setPhone(updatedUser.getPhone());
			existingUser.setBio(updatedUser.getBio());
			existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));

			// Guardar los cambios
			userRepository.save(existingUser);

			return ResponseEntity.ok().body("Usuario actualizado correctamente");
		} else {
			// Usuario no encontrado
			return ResponseEntity.notFound().build();
		}
	}
	
    @Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
    @PutMapping("/updateByUsername")
    public ResponseEntity<String> updateUserByUsername(@RequestParam String username, @RequestBody UserEntity updatedUser) {
        Optional<UserEntity> existingUserOptional = userRepository.findUserByUsername(username);

        if (existingUserOptional.isPresent()) {
            UserEntity existingUser = existingUserOptional.get();

            // Actualizar la información del usuario
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setBio(updatedUser.getBio());
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));

            // Guardar los cambios
            userRepository.save(existingUser);

            return ResponseEntity.ok().body("Usuario actualizado correctamente");
        } else {
            // Usuario no encontrado
            return ResponseEntity.notFound().build();
        }
    }

}