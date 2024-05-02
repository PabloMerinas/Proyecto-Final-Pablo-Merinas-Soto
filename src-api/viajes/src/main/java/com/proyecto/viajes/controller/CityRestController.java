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
import com.proyecto.viajes.services.implement.CityManagementImpl;
import com.proyecto.viajes.services.implement.CountryManagementImpl;
import com.proyecto.viajes.services.implement.VisitedPlaceManagementImpl;

import lombok.AllArgsConstructor;

/**
 * Clase controladora de la API para manejar las solicitudes relacionadas con
 * las ciudades.
 */
@RestController
@RequestMapping("/v1/city")
@AllArgsConstructor
public class CityRestController {

	/**
	 * Inyección de dependencia de CityManagementImpl.
	 * 
	 */
	private CityManagementImpl cityRepository;

	/**
	 * Inyeccion de dependencia de CountryManagementImpl.
	 */
	private CountryManagementImpl countryRepository;

	/**
	 * Inyeccion de dependencia de visitedPlace.
	 */
	private VisitedPlaceManagementImpl visitedPlaceRepository;

	/**
	 * Endpoint para obtener todas las ciudades. Se requiere que el usuario tenga el
	 * rol "ROLE_CUSTOMER" o "ROLE_ADMIN".
	 * 
	 * @return Lista de ciudades.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getCities")
	public List<CityEntity> getCities() {
		return cityRepository.findAll();
	}

	/**
	 * Endpoint para eliminar una ciudad por su nombre. Se requiere el rol de:
	 * "ROLE_ADMIN"
	 * 
	 * @param city Nombre de la ciudad a eliminar.
	 * @return ResponseEntity con la respuesta del servidor.
	 */
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/deleteCityByCity")
	public ResponseEntity<String> deleteCityByCity(@RequestParam String city) {
		// Buscar la ciudad por su nombre
		CityEntity cityToDelete = cityRepository.findByCity(city);

		if (cityToDelete != null) {
			List<VisitedPlaceEntity> visitedPlacesToDelete = visitedPlaceRepository.findByCity(cityToDelete);
			// Eliminar la relación entre los lugares visitados y la atracción
			for (VisitedPlaceEntity visitedPlace : visitedPlacesToDelete) {
				visitedPlace.setCity(null);
				visitedPlaceRepository.save(visitedPlace);
			}
			for (AttractionEntity attractionToDeleteVisitedPlaces : cityToDelete.getAttractions()) {
				List<VisitedPlaceEntity> AttractionVisitedPlacesToDelete = visitedPlaceRepository
						.findByAttraction(attractionToDeleteVisitedPlaces);
				// Eliminar la relación entre los lugares visitados y la atracción
				for (VisitedPlaceEntity visitedPlace : AttractionVisitedPlacesToDelete) {
					visitedPlace.setAttraction(null);
					visitedPlaceRepository.save(visitedPlace);
				}
			}

			// Eliminar la ciudad
			cityRepository.delete(cityToDelete);
			return ResponseEntity.ok().body("Ciudad eliminada correctamente");
		} else {
			// Si la ciudad no existe, devolver la respuesta
			return ResponseEntity.notFound().build();
		}
	}

	/**
	 * Endpoint para recuperar una ciudad por su nombre.
	 * 
	 * @param city Nombre de la ciudad.
	 * @return Ciudad encontrada.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getCityByCity")
	public CityEntity getCityByCity(@RequestParam String city) {
		return cityRepository.findByCity(city);
	}

	/**
	 * Endpoint para agregar una nueva ciudad. Se requiere el rol de "ROLE_ADMIN".
	 * 
	 * @param cityEntity Datos de la ciudad a agregar.
	 * @return ResponseEntity con el resultado de la operación.
	 */
	@Secured("ROLE_ADMIN")
	@PostMapping("/addCity")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<String> addCity(@RequestBody CityEntity cityEntity, @RequestParam String countryName) {
		if (cityEntity != null) {
			// Verificar si la ciudad ya existe
			if (cityRepository.findByCity(cityEntity.getCity()) != null) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body("La ciudad ya existe");
			}

			// Buscar su pais por su nombre
			CountryEntity country = countryRepository.findByCountry(countryName);
			if (country == null) {
				return ResponseEntity.badRequest().body("El pais especificado no fue encontrado");
			}
			cityEntity.setCountry(country);

			// Guardar la nueva ciudad
			cityRepository.save(cityEntity);
			return ResponseEntity.status(HttpStatus.CREATED).body("Ciudad agregada correctamente");
		} else {
			return ResponseEntity.badRequest().body("Los datos de la ciudad son nulos");
		}
	}

	/**
	 * Endpoint para actualizar una ciudad. Se requiere el rol de "ROLE_ADMIN".
	 * 
	 * @param updatedCity Datos actualizados de la ciudad.
	 * @return ResponseEntity con el resultado de la operación.
	 */
	@Secured("ROLE_ADMIN")
	@PostMapping("/updateCity")
	public ResponseEntity<String> updateCity(@RequestBody CityEntity updatedCity, @RequestParam String countryName) {
		CityEntity existingCity = cityRepository.findByCity(updatedCity.getCity());

		if (existingCity != null) {
			// Actualizar los campos de la ciudad
			existingCity.setState(updatedCity.getState());
			existingCity.setAirportCode(updatedCity.getAirportCode());
			existingCity.setPopulation(updatedCity.getPopulation());
			existingCity.setImgUrl(updatedCity.getImgUrl());
			existingCity.setInfo(updatedCity.getInfo());

			CountryEntity country = countryRepository.findByCountry(countryName);
			if (country != null) {
				existingCity.setCountry(country);
			}
			// Guardar los cambios en la base de datos
			cityRepository.save(existingCity);
			return ResponseEntity.ok().body("Ciudad actualizada correctamente");
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
