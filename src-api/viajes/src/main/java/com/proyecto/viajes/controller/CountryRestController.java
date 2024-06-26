package com.proyecto.viajes.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	 * Inicializo el LOGGER con Slf4j.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(CountryRestController.class);

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

			deleteAsociateCitiesToCountry(countryToDelete);
			// Eliminar el país
			countryRepository.delete(countryToDelete);
			LOGGER.info("País eliminado correctamente: {}", countryToDelete);
			return ResponseEntity.ok().body("País eliminado correctamente");
		} else {
			LOGGER.error("No se encontró el país a eliminar: {}", country);
			return ResponseEntity.notFound().build();
		}
	}

	/**
	 * Elimina las ciudades de un pais.
	 * 
	 * @param countryToDelete Pais.
	 */
	private void deleteAsociateCitiesToCountry(CountryEntity countryToDelete) {
		// Obtener la lista de ciudades asociadas al país
		List<CityEntity> citiesToDelete = countryToDelete.getCities();

		// Eliminar los visitedPlaces asociados a las ciudades del país
		for (CityEntity city : citiesToDelete) {
			List<VisitedPlaceEntity> visitedPlacesToDelete = visitedPlaceRepository.findByCity(city);
			for (VisitedPlaceEntity visitedPlace : visitedPlacesToDelete) {
				visitedPlace.setCity(null);
				visitedPlaceRepository.save(visitedPlace);
			}

			deleteAsociateAttractionToCity(city);
		}
	}

	/**
	 * Elimina las attracciones asocidadas a una ciudad.
	 * 
	 * @param city Ciudad.
	 */
	private void deleteAsociateAttractionToCity(CityEntity city) {
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
				LOGGER.error("El país ya existe: {}", countryEntity.getCountry());
				return ResponseEntity.status(HttpStatus.CONFLICT).body("El país ya existe");
			}
			// Guardar el nuevo país
			countryRepository.save(countryEntity);
			LOGGER.info("País agregado correctamente: {}", countryEntity);
			return ResponseEntity.status(HttpStatus.CREATED).body("País agregado correctamente");
		} else {
			LOGGER.error("Los datos del país son nulos");
			return ResponseEntity.badRequest().body("Los datos del país son nulos");
		}
	}

	/**
	 * Endpoint para actualizar un país. Se requiere el rol de "ROLE_ADMIN".
	 * 
	 * @param country        Nombre del país a actualizar.
	 * @param updatedCountry Datos actualizados del país.
	 * @return ResponseEntity con el resultado de la operación.
	 */
	@Secured("ROLE_ADMIN")
	@PostMapping("/updateCountry")
	public ResponseEntity<String> updateCountry(@RequestParam String country,
			@RequestBody CountryEntity updatedCountry) {
		// Verificar si el país existe
		CountryEntity countryToUpdate = countryRepository.findByCountry(country);
		if (countryToUpdate != null) {
			if (!country.equals(updatedCountry.getCountry())
					&& countryRepository.findByCountry(updatedCountry.getCountry()) != null) {
				LOGGER.error("El nuevo nombre de país ya existe: {}", updatedCountry.getCountry());
				return ResponseEntity.status(HttpStatus.CONFLICT).body("El nuevo nombre de país ya existe");
			}

			// Actualizar los campos
			countryToUpdate.setImgUrl(updatedCountry.getImgUrl());
			countryToUpdate.setCapital(updatedCountry.getCapital());
			countryToUpdate.setPopulation(updatedCountry.getPopulation());
			countryToUpdate.setCountryCode(updatedCountry.getCountryCode());
			countryToUpdate.setCurrencyCode(updatedCountry.getCurrencyCode());
			countryToUpdate.setCurrencySymbol(updatedCountry.getCurrencySymbol());
			countryToUpdate.setLanguageCode(updatedCountry.getLanguageCode());
			countryToUpdate.setInfo(updatedCountry.getInfo());

			// Guardo los cambios
			countryRepository.save(countryToUpdate);
			LOGGER.info("País actualizado correctamente: {}", countryToUpdate.getCountry());
			return ResponseEntity.ok().body("País actualizado correctamente");
		} else {
			LOGGER.error("No se encontró el país a actualizar: {}", country);
			return ResponseEntity.notFound().build();
		}
	}

}
