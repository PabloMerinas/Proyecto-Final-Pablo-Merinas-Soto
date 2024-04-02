package com.proyecto.viajes.controller;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.CityEntity;
import com.proyecto.viajes.services.implement.CityManagementImpl;

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

}
