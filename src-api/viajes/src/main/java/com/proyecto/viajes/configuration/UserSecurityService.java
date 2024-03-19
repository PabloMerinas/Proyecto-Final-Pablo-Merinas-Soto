package com.proyecto.viajes.configuration;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.proyecto.viajes.persistence.model.UserEntity;
import com.proyecto.viajes.persistence.repositories.UserRepositoryI;
import com.proyecto.viajes.security.UserRoleEntity;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserSecurityService implements UserDetailsService {

	UserRepositoryI userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Usuario " + username + " no encontrado."));

		String[] roles = user.getRoles().stream().map(UserRoleEntity::getRole).toArray(String[]::new);

		return User.builder().username(user.getUsername()).password(user.getPassword())
				.authorities(this.grantedAuthorities(roles))

				.accountLocked(false).disabled(false).build();
	}

	private String[] getAuthorities(String role) {
		if ("ADMIN".equals(role)) {
			return new String[] { "random_order" };
		}

		return new String[] {};
	}

	private List<GrantedAuthority> grantedAuthorities(String[] roles) {
		List<GrantedAuthority> authorities = new ArrayList<>(roles.length);

		for (String role : roles) {
			authorities.add(new SimpleGrantedAuthority("ROLE_" + role));

			for (String authority : this.getAuthorities(role)) {
				authorities.add(new SimpleGrantedAuthority(authority));
			}
		}

		return authorities;

	}

}