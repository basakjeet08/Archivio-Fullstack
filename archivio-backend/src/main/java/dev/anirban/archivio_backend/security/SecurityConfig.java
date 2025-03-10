package dev.anirban.archivio_backend.security;

import dev.anirban.archivio_backend.constants.UrlConstants;
import dev.anirban.archivio_backend.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(request ->
                        request
                                // public Root Route
                                .requestMatchers(HttpMethod.GET, UrlConstants.PUBLIC_ROOT).permitAll()

                                // Authentication and login Endpoints
                                .requestMatchers(HttpMethod.POST, UrlConstants.REGISTER_ADMIN_ENDPOINT).permitAll()
                                .requestMatchers(HttpMethod.POST, UrlConstants.REGISTER_MEMBER_ENDPOINT).permitAll()
                                .requestMatchers(HttpMethod.POST, UrlConstants.REGISTER_LIBRARIAN_ENDPOINT).hasAuthority(Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.POST, UrlConstants.LOGIN_ENDPOINT).permitAll()

                                // Private Root route
                                .requestMatchers(HttpMethod.GET, UrlConstants.PRIVATE_ROOT).authenticated()

                                // Librarian Endpoints
                                .requestMatchers(HttpMethod.GET, UrlConstants.LIBRARIAN_FETCH_ALL).hasAuthority(Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.GET, UrlConstants.LIBRARIAN_FETCH_BY_ID).hasAuthority(Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.PATCH, UrlConstants.LIBRARIAN_UPDATE).hasAuthority(Role.ADMIN.toString())
                                .requestMatchers(HttpMethod.DELETE, UrlConstants.LIBRARIAN_DELETE).hasAuthority(Role.ADMIN.toString())

                                // Book Endpoints
                                .requestMatchers(HttpMethod.POST, UrlConstants.BOOK_CREATE).hasAuthority(Role.LIBRARIAN.toString())
                                .requestMatchers(HttpMethod.GET, UrlConstants.BOOK_FETCH_ALL).authenticated()
                                .requestMatchers(HttpMethod.GET, UrlConstants.BOOK_FETCH_BY_ID).authenticated()
                                .requestMatchers(HttpMethod.POST, UrlConstants.BOOK_UPDATE).hasAuthority(Role.LIBRARIAN.toString())
                                .requestMatchers(HttpMethod.DELETE, UrlConstants.BOOK_DELETE_BY_ID).hasAuthority(Role.LIBRARIAN.toString())

                                // Book Request Endpoints
                                .requestMatchers(HttpMethod.POST, UrlConstants.BOOK_REQUEST_REQUESTED).hasAuthority(Role.MEMBER.toString())
                                .requestMatchers(HttpMethod.PATCH, UrlConstants.BOOK_REQUEST_APPROVE).hasAuthority(Role.LIBRARIAN.toString())
                                .requestMatchers(HttpMethod.PATCH, UrlConstants.BOOK_REQUEST_RETURN).hasAuthority(Role.MEMBER.toString())
                                .requestMatchers(HttpMethod.GET, UrlConstants.BOOK_REQUEST_FETCH_BY_ID).hasAnyAuthority(Role.LIBRARIAN.toString(), Role.MEMBER.toString())

                                // For any other or all requests
                                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider())
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}