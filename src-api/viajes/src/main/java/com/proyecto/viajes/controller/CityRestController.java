package com.proyecto.viajes.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.AttractionEntity;
import com.proyecto.viajes.persistence.model.CityEntity;
import com.proyecto.viajes.persistence.model.VisitedPlaceEntity;
import com.proyecto.viajes.services.implement.CityManagementImpl;
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

}
