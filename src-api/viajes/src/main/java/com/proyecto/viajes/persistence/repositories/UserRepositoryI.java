package com.proyecto.viajes.persistence.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.UserEntity;

@Repository
public interface UserRepositoryI extends JpaRepository<UserEntity, String> {

	Optional<UserEntity> findOneByEmail(String email);

	Optional<UserEntity> findByUsername(String username);

}
