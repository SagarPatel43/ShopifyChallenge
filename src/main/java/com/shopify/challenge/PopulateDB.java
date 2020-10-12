package com.shopify.challenge;

import com.shopify.challenge.model.User;
import com.shopify.challenge.model.UserRoles;
import com.shopify.challenge.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Slf4j
public class PopulateDB implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    public PopulateDB(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

        User userAdmin = new User("Wolverine", encoder.encode( "password"), UserRoles.ADMIN);
        User user1 = new User("Dash", encoder.encode( "password"), UserRoles.USER);
        User user2 = new User("Reaper", encoder.encode( "password"), UserRoles.USER);
        User user3 = new User("Dragonfly", encoder.encode( "password"), UserRoles.USER);

        if (userRepository.findByUsername(userAdmin.getUsername()).orElse(null) == null) {
            userRepository.saveAll(Arrays.asList(userAdmin, user1, user2, user3));
            log.info("Pre-populating DB with 1 admin and 3 users ...");
        }
    }
}
