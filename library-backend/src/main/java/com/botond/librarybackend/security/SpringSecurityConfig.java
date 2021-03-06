package com.botond.librarybackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Qualifier("userService")
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().disable();
        http.csrf().disable().cors()
                .and().authorizeRequests()
                .antMatchers("/api/basicauth").permitAll()
                .antMatchers("/api/books/newBook").hasRole("ADMIN")
                .antMatchers("/api/books/delete/**").hasRole("ADMIN")
                .antMatchers("/api/books/update/**").hasRole("ADMIN")
                .antMatchers("/api/books/updateQuantity/**").hasRole("ADMIN")
                .antMatchers("/api/books/updateQuantityByOne/**").hasRole("ADMIN")
                .antMatchers("/api/books/getAllBooks").permitAll()
                .antMatchers("/api/books/**").permitAll()
                .antMatchers("/api/members/mydata").hasRole("USER")
                .antMatchers("/api/borrows/myborrows").hasRole("USER")
                .antMatchers("/**").hasRole("ADMIN")
                .and().httpBasic();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }
}
