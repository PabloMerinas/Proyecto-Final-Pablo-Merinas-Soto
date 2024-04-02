package com.proyecto.viajes.controller;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.CountryEntity;
import com.proyecto.viajes.services.implement.CountryManagementImpl;

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

}
