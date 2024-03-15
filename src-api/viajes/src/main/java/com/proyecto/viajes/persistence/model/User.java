package com.proyecto.viajes.persistence.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "T_USER")
public class User implements Serializable {
	/**
	* 
	*/
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "C_IDUSER")
	private Long idUser;

	@Column(name = "C_NAME")
	private String name;

	@Column(name = "C_USERNAME")
	private String username;

	@Column(name = "C_PASSWORD")
	private String password;

	@Column(name = "C_EMAIL")
	private String email;

	@Enumerated(EnumType.STRING)
	@CollectionTable(name = "USER_ROL")
	@Column(name = "C_ROLES")
	private RolUser rol;

}
