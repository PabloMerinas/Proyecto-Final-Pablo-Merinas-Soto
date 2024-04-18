package com.proyecto.viajes.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.VisitedPlaceEntity;
import com.proyecto.viajes.services.implement.UserManagementImpl;
import com.proyecto.viajes.services.implement.VisitedPlaceManagementImpl;

import lombok.AllArgsConstructor;

/**
 * Clase controladora de la API para manejar las operaciones relacionadas con
 * los lugares visitados.
 */
@RestController
@RequestMapping("/v1/visitedPlaces")
@AllArgsConstructor
public class VisitedPlaceRestController {

	/**
	 * Inyección de dependencia de VititedPlaceManagementImpl.
	 */
	private VisitedPlaceManagementImpl visitedPlaceRepository;

	/**
	 * Inyección de dependencia de UserManagementImpl.
	 */
	private UserManagementImpl userRepository;

	/**
	 * Método para marcar como visitado un lugar, ya sea un Pais, una Ciudad o una
	 * Attracción.
	 * 
	 * @param visitedPlace Lugar visitado.
	 * @return Respuesta del servidor.
	 */
	@PostMapping
	public ResponseEntity<VisitedPlaceEntity> markAsVisited(@RequestBody VisitedPlaceEntity visitedPlace) {
		return ResponseEntity.ok(visitedPlace);
	}

	/**
	 * Método para recuperar los lugares visitados por un usuario.
	 * 
	 * @param username Usuario por el que se van a buscar los lugares visitados.
	 * @return Lista de los lugares visitados.
	 */
	@GetMapping
	public ResponseEntity<List<VisitedPlaceEntity>> getVisitedPlacesByUsername(@RequestParam String username) {
		return ResponseEntity
				.ok(visitedPlaceRepository.getVisitedPlaces(userRepository.findByUsername(username).orElse(null)));
	}
}
