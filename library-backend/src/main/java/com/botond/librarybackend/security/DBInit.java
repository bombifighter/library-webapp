package com.botond.librarybackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DBInit implements CommandLineRunner {

    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    public DBInit(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

   @Override
    public void run(String... args) throws Exception {
        this.userRepository.deleteAll();

        User user = new User();
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("secret"));
        user.setAuthority(Role.ROLE_ADMIN);
        this.userRepository.save(user);

       User user2 = new User();
       user2.setUsername("user");
       user2.setPassword(passwordEncoder.encode("secret"));
       user2.setAuthority(Role.ROLE_USER);
       this.userRepository.save(user2);
    }
}
