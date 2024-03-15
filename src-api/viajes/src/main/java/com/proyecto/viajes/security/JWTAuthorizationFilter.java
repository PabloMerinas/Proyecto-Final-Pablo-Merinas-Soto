package com.proyecto.viajes.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.proyecto.viajes.persistence.model.RolUser;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthorizationFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String bearerToken = request.getHeader("Authorization");

		if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
			String token = bearerToken.replace("Bearer ", "");
			UsernamePasswordAuthenticationToken usernamePAT = TokenUtils.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(usernamePAT);

			RolUser rolUser = getUserRoleFromToken(usernamePAT);
			System.out.println(rolUser);
		}
		filterChain.doFilter(request, response);
	}

	private RolUser getUserRoleFromToken(UsernamePasswordAuthenticationToken usernamePAT) {
		String roleName = (String) usernamePAT.getPrincipal();

		if (roleName != null) {
			if (roleName.equalsIgnoreCase("admin")) {
				return RolUser.ROLE_ADMIN;
			} else if (roleName.equalsIgnoreCase("user")) {
				return RolUser.ROLE_USER;
			}
		}
		return null;
	}

	private boolean hasRole(String userRole, String requiredRole) {
		return userRole.equals(requiredRole);
	}
}
