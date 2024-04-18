package com.proyecto.viajes.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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
		return ResponseEntity.ok(visitedPlace);
	}

//	/**
//	 * Método para recuperar los lugares visitados por un usuario.
//	 * 
//	 * @param username Usuario por el que se van a buscar los lugares visitados.
//	 * @return Lista de los lugares visitados.
//	 */
//	@GetMapping("/getVisitedPlacesByUsername")
//	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
//	public ResponseEntity<List<VisitedPlaceInfoDTO>> getVisitedPlacesByUsername(@RequestParam String username) {
//		List<VisitedPlaceEntity> visitedPlaces = visitedPlaceRepository
//				.getVisitedPlaces(userRepository.findByUsername(username).orElse(null));
//
//		List<VisitedPlaceInfoDTO> result = new ArrayList<>();
//		for (VisitedPlaceEntity visitedPlace : visitedPlaces) {
//			VisitedPlaceInfoDTO placeInfo = null;
//			// Dependiendo del tipo que sea, creo su DTO solo con los datos de tal
//			if (visitedPlace.getCountry() != null) {
//				CountryEntity country = visitedPlace.getCountry();
//				placeInfo = new VisitedPlaceInfoDTO(username, country.getImgUrl(), country.getCapital(),
//						country.getPopulation(), country.getCountry(), country.getCountryCode(),
//						country.getCurrencyCode(), country.getCurrencySymbol(), country.getLanguageCode(),
//						country.getInfo(), null, null, null, null, null, null, null, null);
//			} else if (visitedPlace.getCity() != null) {
//				CityEntity city = visitedPlace.getCity();
//				placeInfo = new VisitedPlaceInfoDTO(username, null, null, null, null, null, null, null, null, null,
//						city.getCity(), city.getState(), city.getAirportCode(), city.getPopulation(), city.getInfo(),
//						null, null, null);
//			} else if (visitedPlace.getAttraction() != null) {
//				AttractionEntity attraction = visitedPlace.getAttraction();
//				placeInfo = new VisitedPlaceInfoDTO(username, null, null, null, null, null, null, null, null, null,
//						null, null, null, null, null, attraction.getAttraction(), attraction.getCategory().toString(),
//						attraction.getInfo());
//			}
//			if (placeInfo != null) {
//				result.add(placeInfo);
//			}
//		}
//
//		return ResponseEntity.ok(result);
//	}
//
//	/**
//	 * Marca como visitado un lugar, se le pasa un lugar, que puede ser un pais,
//	 * ciudad o atraccion. Se le pasa el usuario al que se le va a agregar.
//	 * 
//	 * @param requestBody Request body que contiene la información del lugar
//	 *                    visitado y el nombre de usuario del usuario.
//	 * @return ResponseEntity con el resultado de la operación.
//	 */
//	@PostMapping("/markAsVisitedByUsername")
//	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
//	public ResponseEntity<String> markAsVisitedByUsername(@RequestBody VisitedPlaceInfoDTO requestBody) {
//		// Obtener el usuario por su nombre de usuario
//		UserEntity user = userRepository.findByUsername(requestBody.username())
//				.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
//
//		// Crear instancias de las entidades correspondientes
//		CountryEntity country = new CountryEntity();
//		country.setImgUrl(requestBody.countryImgUrl());
//		country.setCapital(requestBody.countryCapital());
//		country.setPopulation(requestBody.countryPopulation());
//		country.setCountry(requestBody.countryName());
//		country.setCountryCode(requestBody.countryCountryCode());
//		country.setCurrencyCode(requestBody.countryCurrencyCode());
//		country.setCurrencySymbol(requestBody.countryCurrencySymbol());
//		country.setLanguageCode(requestBody.countryLanguageCode());
//		country.setInfo(requestBody.countryInfo());
//
//		CityEntity city = new CityEntity();
//		city.setCity(requestBody.cityName());
//		city.setState(requestBody.cityState());
//		city.setAirportCode(requestBody.cityAirportCode());
//		city.setPopulation(requestBody.cityPopulation());
//		city.setInfo(requestBody.cityInfo());
//
//		AttractionEntity attraction = new AttractionEntity();
//		attraction.setAttraction(requestBody.attractionName());
//		attraction.setCategory(CATEGORY.valueOf(requestBody.attractionCategory()));
//		attraction.setInfo(requestBody.attractionInfo());
//
//		// Marcar el lugar como visitado
//		visitedPlaceRepository.markAsVisited(user, country, city, attraction);
//
//		// Devolver una respuesta exitosa
//		return ResponseEntity.status(HttpStatus.CREATED).body("Lugar visitado marcado exitosamente");
//	}

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
				return ResponseEntity.badRequest().body("El lugar no existe");
		}

		CityEntity city = null;
		if (cityId != null) {
			city = cityRepository.findById(cityId);
			if (city == null)
				return ResponseEntity.badRequest().body("El lugar no existe");
		}

		AttractionEntity attraction = null;
		if (attractionId != null) {
			attraction = attractionRepository.findById(attractionId);
			if (attraction == null)
				return ResponseEntity.badRequest().body("El lugar no existe");
		}

		// Verificar si el lugar ya está marcado como visitado
		if (visitedPlaceRepository.existsByUserAndCountryAndCityAndAttraction(user, country, city, attraction)) {
			return ResponseEntity.badRequest().body("El lugar ya está marcado como visitado");
		}

		// Marcar el lugar como visitado
		VisitedPlaceEntity visitedPlace = visitedPlaceRepository.markAsVisited(user, country, city, attraction);

		if (visitedPlace != null) {
			return ResponseEntity.ok("Lugar marcado como visitado correctamente");
		} else {
			return ResponseEntity.badRequest().body("No se pudo marcar el lugar como visitado");
		}
	}

}
