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
		return attractionRepository.findByAttraction(attraction);
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
			return ResponseEntity.ok().body("Atracción eliminada correctamente");
		} else {
			// Si la atracción no existe, devolver la respuesta
			return ResponseEntity.notFound().build();
		}
	}
	
	/**
	 * Endpoint para agregar una nueva atracción. Se requiere el rol de "ROLE_ADMIN".
	 * 
	 * @param attractionEntity Datos de la atracción a agregar.
	 * @return ResponseEntity con el resultado de la operación.
	 */
	@Secured("ROLE_ADMIN")
	@PostMapping("/addAttraction")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<String> addAttraction(@RequestBody AttractionEntity attractionEntity, @RequestParam String cityName) {
	    if (attractionEntity != null) {
	        // Verificar si la atracción existe
	        if (attractionRepository.findByAttraction(attractionEntity.getAttraction()) != null) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("La atracción ya existe");
	        }
	        
	        // Buscar la ciudad por su nombre
	        CityEntity city = cityRepository.findByCity(cityName);
	        if (city == null) {
	            return ResponseEntity.badRequest().body("La ciudad especificada no fue encontrada");
	        }
	        attractionEntity.setCity(city);

	        // Guardar la nueva atracción
	        attractionRepository.save(attractionEntity);
	        return ResponseEntity.status(HttpStatus.CREATED).body("Atracción agregada correctamente");
	    } else {
	        return ResponseEntity.badRequest().body("Los datos de la atracción son nulos");
	    }
	}

}
