package com.proyecto.viajes.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/v1/users")
public class UserRestController {

	@Secured("ROLE_ADMIN")
	@GetMapping("/admin")
	public ResponseEntity<String> get() {
		return ResponseEntity.ok("admin!");
	}

	@Secured("ROLE_USER")
	@GetMapping("/user")
	public ResponseEntity<String> get2() {
		return ResponseEntity.ok("Usuario!");
	}

}