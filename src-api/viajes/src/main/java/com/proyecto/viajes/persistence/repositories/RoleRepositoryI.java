package com.proyecto.viajes.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.security.UserRoleEntity;

@Repository
public interface RoleRepositoryI extends JpaRepository<UserRoleEntity, Long> {

	List<UserRoleEntity> findByUsername(String username);

}
