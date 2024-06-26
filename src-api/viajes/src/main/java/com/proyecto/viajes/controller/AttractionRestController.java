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
import com.proyecto.viajes.persistence.model.VisitedPlaceEntity;
import com.proyecto.viajes.services.implement.AttractionManagementImpl;
import com.proyecto.viajes.services.implement.CityManagementImpl;
import com.proyecto.viajes.services.implement.VisitedPlaceManagementImpl;

import lombok.AllArgsConstructor;

/**
 * Clase controladora de la api de los endpoint de las atracciones
 */
@RestController
@RequestMapping("/v1/attraction")
@AllArgsConstructor
public class AttractionRestController {

	/**
	 * Inicializo el LOGGER con Slf4j.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(AttractionRestController.class);

	/**
	 * Inyección de dependencia.
	 */
	private AttractionManagementImpl attractionRepository;

	/**
	 * Inyeccion de dependencia de visitedPlace.
	 */
	private VisitedPlaceManagementImpl visitedPlaceRepository;

	/**
	 * Inyeccion de dependencia de cityRepository;
	 */
	private CityManagementImpl cityRepository;

	/**
	 * Endpoint para obtener todas las atraciones. Se requiere que el usuario tenga
	 * el rol "ROLE_CUSTOMER" o "ROLE_ADMIN".
	 * 
	 * @return Lista de atracciones
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping()
	public List<AttractionEntity> getAttractions() {
		return attractionRepository.findAll();
	}

	/**
	 * Endpoint para recuperar una atraccion por su nombre.
	 * 
	 * @param Attraction Nombre de la atraccion.
	 * @return Atracción encontrada.
	 */
	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getAttractionByAttraction")
	public AttractionEntity getAttractionByAttraction(@RequestParam String attraction) {
		AttractionEntity attractionEntity = attractionRepository.findByAttraction(attraction);
		if (attractionEntity == null) {
			LOGGER.error("No se encontró ninguna atracción con el nombre: {}", attraction);
		}
		return attractionEntity;
	}

	/**
	 * Endpoint para eliminar una atracción por su nombre. Se requiere el rol de:
	 * "ROLE_ADMIN"
	 * 
	 * @param attraction Nombre de la atracción a eliminar.
	 * @return ResponseEntity con la respuesta del servidor.
	 */
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/deleteAttractionByAttraction")
	public ResponseEntity<String> deleteAttractionByAttraction(@RequestParam String attraction) {
		// Buscar la atracción por su nombre
		AttractionEntity attractionToDelete = attractionRepository.findByAttraction(attraction);

		if (attractionToDelete != null) {
			List<VisitedPlaceEntity> visitedPlacesToDelete = visitedPlaceRepository
					.findByAttraction(attractionToDelete);
			// Eliminar la relación entre los lugares visitados y la atracción
			for (VisitedPlaceEntity visitedPlace : visitedPlacesToDelete) {
				visitedPlace.setAttraction(null);
				visitedPlaceRepository.save(visitedPlace);
			}
			// Eliminar la atracción
			attractionRepository.delete(attractionToDelete);
			LOGGER.info("Se ha eliminado la atracción: {}", attractionToDelete);
			return ResponseEntity.ok().body("Atracción eliminada correctamente");
		} else {
			// Si la atracción no existe, devolver la respuesta
			return ResponseEntity.notFound().build();
		}
	}

	/**
	 * Endpoint para agregar una nueva atracción. Se requiere el rol de
	 * "ROLE_ADMIN".
	 * 
	 * @param attractionEntity Datos de la atracción a agregar.
	 * @return ResponseEntity con el resultado de la operación.
	 */
	@Secured("ROLE_ADMIN")
	@PostMapping("/addAttraction")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<String> addAttraction(@RequestBody AttractionEntity attractionEntity,
			@RequestParam String cityName) {
		if (attractionEntity != null) {
			// Verificar si la atracción existe
			if (attractionRepository.findByAttraction(attractionEntity.getAttraction()) != null) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body("La atracción ya existe");
			}

			// Buscar la ciudad por su nombre
			CityEntity city = cityRepository.findByCity(cityName);
			if (city == null) {
	            LOGGER.error("La ciudad especificada no fue encontrada: {}", cityName);
				return ResponseEntity.badRequest().body("La ciudad especificada no fue encontrada");
			}
			attractionEntity.setCity(city);

			// Guardar la nueva atracción
			attractionRepository.save(attractionEntity);
			LOGGER.info("Attracción agregada correctamente: {}", attractionEntity);
			return ResponseEntity.status(HttpStatus.CREATED).body("Atracción agregada correctamente");
		} else {
	        LOGGER.error("Los datos de la atracción son nulos");
			return ResponseEntity.badRequest().body("Los datos de la atracción son nulos");
		}
	}

	/**
	 * Endpoint para actualizar una atracción. Se requiere el rol de "ROLE_ADMIN".
	 * 
	 * @param updatedAttraction Datos actualizados de la atracción.
	 * @param cityName          Nombre de la ciudad asociada a la atracción.
	 * @return ResponseEntity con el resultado de la operación.
	 */
	@Secured("ROLE_ADMIN")
	@PostMapping("/updateAttraction")
	public ResponseEntity<String> updateAttraction(@RequestBody AttractionEntity updatedAttraction,
			@RequestParam String cityName) {
		AttractionEntity existingAttraction = attractionRepository.findByAttraction(updatedAttraction.getAttraction());

		if (existingAttraction != null) {
			CityEntity city = cityRepository.findByCity(cityName);
			if (city == null) {
				return ResponseEntity.badRequest().body("La ciudad especificada no fue encontrada");
			}
			existingAttraction.setAttraction(updatedAttraction.getAttraction());
			existingAttraction.setCategory(updatedAttraction.getCategory());
			existingAttraction.setCity(city);
			existingAttraction.setImgUrl(updatedAttraction.getImgUrl());
			existingAttraction.setInfo(updatedAttraction.getInfo());
			existingAttraction.setPrice(updatedAttraction.getPrice());

			// Guardao
			attractionRepository.save(existingAttraction);
			LOGGER.info("Atracción actualizada correctamente: {}", existingAttraction);
			return ResponseEntity.ok().body("Atracción actualizada correctamente");
		} else {
	        LOGGER.error("No se encontró ninguna atracción con el nombre: {}", updatedAttraction.getAttraction());
			return ResponseEntity.notFound().build();
		}
	}

}
