package com.proyecto.viajes.security;

import com.proyecto.viajes.persistence.model.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "T_USER_ROLE")
@Data
public class UserRoleEntity {

	@Id
	@Column(nullable = false, length = 20)
	private String username;

	@Id
	@Column(nullable = false, length = 20)
	private String role;

	@ManyToOne
	@JoinColumn(name = "username", referencedColumnName = "username", insertable = false, updatable = false)
	private UserEntity user;
}
