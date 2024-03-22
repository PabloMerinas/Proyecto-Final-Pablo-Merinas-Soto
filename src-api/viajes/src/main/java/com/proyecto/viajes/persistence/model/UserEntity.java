package com.proyecto.viajes.persistence.model;

import java.util.List;

import com.proyecto.viajes.security.UserRoleEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "T_USER")
public class UserEntity {

	@Id
	@Column(nullable = false, length = 20)
	private String username;

	@Column(nullable = false, length = 100)
	private String password;

	@Column(length = 50)
	private String email;

	@Column(length = 12)
	private String phone;

	@Column(length = 256)
	private String bio;

	@Column(nullable = false, columnDefinition = "TINYINT")
	private Boolean active;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<UserRoleEntity> roles;

}
