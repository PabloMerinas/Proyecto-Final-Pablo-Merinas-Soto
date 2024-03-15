package com.proyecto.viajes.persistence.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.viajes.persistence.model.User;

@Repository
public interface UserRepositoryI extends JpaRepository<User, Long> {

	Optional<User> findOneByEmail(String email);

}
