package com.proyecto.viajes.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.AttractionEntity;
import com.proyecto.viajes.persistence.model.CityEntity;
import com.proyecto.viajes.persistence.model.CountryEntity;
import com.proyecto.viajes.persistence.model.VisitedPlaceEntity;
import com.proyecto.viajes.services.implement.CountryManagementImpl;
import com.proyecto.viajes.services.implement.VisitedPlaceManagementImpl;

import lombok.AllArgsConstructor;

/**
 * Clase controladora de la API para manejar las solicitudes relacionadas con
 * los países.
 */
@RestController
@RequestMapping("/v1/country")
@AllArgsConstructor
public class CountryRestController {

	/**
	 * Inyección de dependencia de CountryManagementImpl.
	 */
	private CountryManagementImpl countryRepository;

	/**
	 * Inyeccion de dependencia de visitedPlace.
	 */
	private VisitedPlaceManagementImpl visitedPlaceRepository;

	/**
	 * Endpoint para obtener todos los países. Se requiere que el usuario tenga el
	 * rol "ROLE_CUSTOMER" o "ROLE_ADMIN".
	 * 
	 * @return Lista de los paises..
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getCountries")
	public List<CountryEntity> getCountries() {
		return countryRepository.findAll();
	}

	/**
	 * Endpoint para obtener un país por su nombre. Se requiere que el usuario tenga
	 * el rol "ROLE_CUSTOMER" o "ROLE_ADMIN".
	 * 
	 * @return Pais encontrado
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getCountryByCountry")
	public CountryEntity getCountryByCountry(@RequestParam String country) {
		return countryRepository.findByCountry(country);
	}

	/**
	 * Endpoint para eliminar un país por su nombre. Se requiere el rol de:
	 * "ROLE_ADMIN"
	 * 
	 * @param country Nombre del país a eliminar.
	 * @return ResponseEntity con la respuesta del servidor.
	 */
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/deleteCountryByCountry")
	public ResponseEntity<String> deleteCountryByCountry(@RequestParam String country) {
		CountryEntity countryToDelete = countryRepository.findByCountry(country);

		// Obtengo la lista de los country y los elimino
		if (countryToDelete != null) {
			List<VisitedPlaceEntity> visitedPlacesToDeleteCountry = visitedPlaceRepository
					.findByCountry(countryToDelete);
			for (VisitedPlaceEntity visitedPlace : visitedPlacesToDeleteCountry) {
				visitedPlace.setCountry(null);
				visitedPlaceRepository.save(visitedPlace);
			}

			// Obtener la lista de ciudades asociadas al país
			List<CityEntity> citiesToDelete = countryToDelete.getCities();

			// Eliminar los visitedPlaces asociados a las ciudades del país
			for (CityEntity city : citiesToDelete) {
				List<VisitedPlaceEntity> visitedPlacesToDelete = visitedPlaceRepository.findByCity(city);
				for (VisitedPlaceEntity visitedPlace : visitedPlacesToDelete) {
					visitedPlace.setCity(null);
					visitedPlaceRepository.save(visitedPlace);
				}

				// Eliminar las atracciones asociadas a la ciudad
				for (AttractionEntity attractionToDelete : city.getAttractions()) {
					List<VisitedPlaceEntity> attractionVisitedPlacesToDelete = visitedPlaceRepository
							.findByAttraction(attractionToDelete);
					for (VisitedPlaceEntity visitedPlace : attractionVisitedPlacesToDelete) {
						visitedPlace.setAttraction(null);
						visitedPlaceRepository.save(visitedPlace);
					}
				}
			}
			// Eliminar el país
			countryRepository.delete(countryToDelete);
			return ResponseEntity.ok().body("País eliminado correctamente");
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	/**
	 * Endpoint para agregar un nuevo país. Se requiere el rol de "ROLE_ADMIN".
	 * 
	 * @param countryEntity Datos del país a agregar.
	 * @return ResponseEntity con el resultado de la operación.
	 */
	@Secured("ROLE_ADMIN")
	@PostMapping("/addCountry")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<String> addCountry(@RequestBody CountryEntity countryEntity) {
	    if (countryEntity != null) {
	        // Verificar si el país ya existe
	        if (countryRepository.findByCountry(countryEntity.getCountry()) != null) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("El país ya existe");
	        }
	        // Guardar el nuevo país
	        countryRepository.save(countryEntity);
	        return ResponseEntity.status(HttpStatus.CREATED).body("País agregado correctamente");
	    } else {
	        return ResponseEntity.badRequest().body("Los datos del país son nulos");
	    }
	}
}
