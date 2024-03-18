package com.proyecto.viajes.security;

import java.io.Serializable;
import java.util.Objects;

import lombok.Data;

@Data
public class UserRoleId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String username;
	private String role;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserRoleId other = (UserRoleId) obj;
		return Objects.equals(role, other.role) && Objects.equals(username, other.username);
	}

	@Override
	public int hashCode() {
		return Objects.hash(role, username);
	}

}