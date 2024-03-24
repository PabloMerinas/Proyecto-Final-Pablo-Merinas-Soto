package com.proyecto.viajes.controller;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.viajes.persistence.model.CityEntity;
import com.proyecto.viajes.services.implement.CityManagementImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/v1/city")
@AllArgsConstructor
public class CityRestController {

	private CityManagementImpl cityRepository;

	@Secured({ "ROLE_CUSTOMER", "ROLE_ADMIN" })
	@GetMapping("/getCities")
	public List<CityEntity> getCities() {
		return cityRepository.findAll();
	}

}
