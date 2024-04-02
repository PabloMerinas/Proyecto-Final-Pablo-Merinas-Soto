package com.proyecto.viajes.controller;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.AttractionEntity;
import com.proyecto.viajes.services.implement.AttractionManagementImpl;

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

}
