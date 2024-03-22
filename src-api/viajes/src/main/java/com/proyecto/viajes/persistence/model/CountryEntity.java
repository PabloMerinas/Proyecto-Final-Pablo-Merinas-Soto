package com.proyecto.viajes.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class CountryEntity {

	@Id
	private Long id;
}
