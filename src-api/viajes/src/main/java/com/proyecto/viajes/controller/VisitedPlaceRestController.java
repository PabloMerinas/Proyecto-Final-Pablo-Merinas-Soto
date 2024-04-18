package com.proyecto.viajes.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.dto.VisitedPlaceInfoDTO;
import com.proyecto.viajes.persistence.model.AttractionEntity;
import com.proyecto.viajes.persistence.model.CityEntity;
import com.proyecto.viajes.persistence.model.CountryEntity;
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
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	public ResponseEntity<VisitedPlaceEntity> markAsVisited(@RequestBody VisitedPlaceEntity visitedPlace) {
		return ResponseEntity.ok(visitedPlace);
	}

	/**
	 * Método para recuperar los lugares visitados por un usuario.
	 * 
	 * @param username Usuario por el que se van a buscar los lugares visitados.
	 * @return Lista de los lugares visitados.
	 */
	@GetMapping("/getVisitedPlacesByUsername")
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	public ResponseEntity<List<VisitedPlaceInfoDTO>> getVisitedPlacesByUsername(@RequestParam String username) {
		List<VisitedPlaceEntity> visitedPlaces = visitedPlaceRepository
				.getVisitedPlaces(userRepository.findByUsername(username).orElse(null));

		List<VisitedPlaceInfoDTO> result = new ArrayList<>();
		for (VisitedPlaceEntity visitedPlace : visitedPlaces) {
			VisitedPlaceInfoDTO placeInfo = null;
			// Dependiendo del tipo que sea, creo su DTO solo con los datos de tal
			if (visitedPlace.getCountry() != null) {
				CountryEntity country = visitedPlace.getCountry();
				placeInfo = new VisitedPlaceInfoDTO(country.getImgUrl(), country.getCapital(), country.getPopulation(),
						country.getCountry(), country.getCountryCode(), country.getCurrencyCode(),
						country.getCurrencySymbol(), country.getLanguageCode(), country.getInfo(), null, null, null,
						null, null, null, null, null);
			} else if (visitedPlace.getCity() != null) {
				CityEntity city = visitedPlace.getCity();
				placeInfo = new VisitedPlaceInfoDTO(null, null, null, null, null, null, null, null, null,
						city.getCity(), city.getState(), city.getAirportCode(), city.getPopulation(), city.getInfo(),
						null, null, null);
			} else if (visitedPlace.getAttraction() != null) {
				AttractionEntity attraction = visitedPlace.getAttraction();
				placeInfo = new VisitedPlaceInfoDTO(null, null, null, null, null, null, null, null, null, null, null,
						null, null, null, attraction.getAttraction(), attraction.getCategory().toString(),
						attraction.getInfo());
			}
			if (placeInfo != null) {
				result.add(placeInfo);
			}
		}

		return ResponseEntity.ok(result);
	}

}
