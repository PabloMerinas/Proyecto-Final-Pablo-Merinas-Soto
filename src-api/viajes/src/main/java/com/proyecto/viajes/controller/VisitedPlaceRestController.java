package com.proyecto.viajes.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.AttractionEntity;
import com.proyecto.viajes.persistence.model.CityEntity;
import com.proyecto.viajes.persistence.model.CountryEntity;
import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.persistence.model.VisitedPlaceEntity;
import com.proyecto.viajes.services.implement.AttractionManagementImpl;
import com.proyecto.viajes.services.implement.CityManagementImpl;
import com.proyecto.viajes.services.implement.CountryManagementImpl;
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
	 * Inicializo el LOGGER con Slf4j.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(VisitedPlaceRestController.class);

	/**
	 * Constante con el texto El lugar no existe.
	 */
	private static final String EL_LUGAR_NO_EXISTE = "El lugar no existe";

	/**
	 * Constante con el texto place
	 */
	private static final String PLACE = "place";

	/**
	 * Inyección de dependencia de VititedPlaceManagementImpl.
	 */
	private VisitedPlaceManagementImpl visitedPlaceRepository;

	/**
	 * Inyección de dependencia de UserManagementImpl.
	 */
	private UserManagementImpl userRepository;

	/**
	 * Inyección de dependencia de CountryManagementImpl
	 */
	private final CountryManagementImpl countryRepository;

	/**
	 * Inyección de dependencia de CityManagementImpl
	 */
	private final CityManagementImpl cityRepository;

	/**
	 * Inyección de dependencia de AttractionManagementImpl
	 */
	private final AttractionManagementImpl attractionRepository;

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
		LOGGER.info("Marcando lugar como visitado: {}", visitedPlace);
		return ResponseEntity.ok(visitedPlace);
	}

	/**
	 * Recupera los lugares visitados por el usuario.
	 * 
	 * @param username Usuario que ha visitado los lugares.
	 * @return Lista de un mapa con el tipo de lugar y su id.
	 */
	@GetMapping("/getVisitedPlacesByUsername")
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	public ResponseEntity<List<Map<String, Object>>> getVisitedPlacesByUsername(@RequestParam String username) {
		List<VisitedPlaceEntity> visitedPlaces = visitedPlaceRepository
				.getVisitedPlaces(userRepository.findByUsername(username).orElse(null));

		List<Map<String, Object>> result = new ArrayList<>();
		for (VisitedPlaceEntity visitedPlace : visitedPlaces) {
			Map<String, Object> placeInfo = new HashMap<>();
			// Determinar el tipo de lugar visitado y su ID correspondiente
			if (visitedPlace.getCountry() != null) {
				placeInfo.put(PLACE, "country");
				placeInfo.put("id", visitedPlace.getCountry().getId());
			} else if (visitedPlace.getCity() != null) {
				placeInfo.put(PLACE, "city");
				placeInfo.put("id", visitedPlace.getCity().getId());
			} else if (visitedPlace.getAttraction() != null) {
				placeInfo.put(PLACE, "attraction");
				placeInfo.put("id", visitedPlace.getAttraction().getId());
			}
			placeInfo.put("visitedPlaceId", visitedPlace.getId());
			result.add(placeInfo);
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * Marca un lugar como visitado.
	 * 
	 * @param username     Usuario que ha visitado el lugar.
	 * @param countryId    Id del pais visitado.
	 * @param cityId       Id de la ciudad visitada.
	 * @param attractionId Id de la atraccion visitada.
	 * @return Respuesta del servidor.
	 */
	@PostMapping("/markAsVisitedByUsername")
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	public ResponseEntity<String> markAsVisitedByUsername(@RequestParam String username,
			@RequestParam(required = false) Long countryId, @RequestParam(required = false) Long cityId,
			@RequestParam(required = false) Long attractionId) {
		// Obtengo el usuario al que se le va a marcar como visto
		UserEntity user = userRepository.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

		// Dependiendo de que le he pasado lo buscara y guardara
		CountryEntity country = null;
		if (countryId != null) {
			country = countryRepository.findById(countryId);
			if (country == null)
				return ResponseEntity.badRequest().body(EL_LUGAR_NO_EXISTE);
		}

		CityEntity city = null;
		if (cityId != null) {
			city = cityRepository.findById(cityId);
			if (city == null)
				return ResponseEntity.badRequest().body(EL_LUGAR_NO_EXISTE);
		}

		AttractionEntity attraction = null;
		if (attractionId != null) {
			attraction = attractionRepository.findById(attractionId);
			if (attraction == null)
				return ResponseEntity.badRequest().body(EL_LUGAR_NO_EXISTE);
		}

		// Verificar si el lugar ya está marcado como visitado
		if (visitedPlaceRepository.existsByUserAndCountryAndCityAndAttraction(user, country, city, attraction)) {
			return ResponseEntity.badRequest().body("El lugar ya está marcado como visitado");
		}

		// Marcar el lugar como visitado
		VisitedPlaceEntity visitedPlace = visitedPlaceRepository.markAsVisited(user, country, city, attraction);

		if (visitedPlace != null) {
			LOGGER.info("Marcando lugar como visitado por usuario: {}", username);
			return ResponseEntity.ok("Lugar marcado como visitado correctamente");
		} else {
			LOGGER.error("No se pudo marcar el lugar como visitado");
			return ResponseEntity.badRequest().body("No se pudo marcar el lugar como visitado");
		}
	}

	/**
	 * Elimina un lugar visitado por su ID.
	 * 
	 * @param placeId ID del lugar visitado a eliminar.
	 * @return Respuesta del servidor.
	 */
	@DeleteMapping("/deleteVisitedPlace")
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	public ResponseEntity<String> deleteVisitedPlace(@RequestParam Long placeId) {
		// Buscar el lugar visitado por su ID
		VisitedPlaceEntity visitedPlace = visitedPlaceRepository.findById(placeId)
				.orElseThrow(() -> new RuntimeException("Lugar visitado no encontrado"));

		// Eliminar el lugar visitado
		visitedPlaceRepository.delete(visitedPlace);
		LOGGER.info("Lugar visitado eliminado correctamente");
		return ResponseEntity.ok("Lugar visitado eliminado correctamente");
	}

}
