package com.shopify.challenge.service;

import com.shopify.challenge.dto.UserDTO;
import com.shopify.challenge.model.User;
import com.shopify.challenge.model.UserRoles;
import com.shopify.challenge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserRepository userRepository;

    @Autowired
    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PreAuthorize("#username == principal.username")
    public UserDTO loginUser(String username) throws Exception {
        User user = userRepository.findByUsername(username).orElseThrow(Exception::new);

        return new UserDTO(user.getUsername(), user.getRole().equals(UserRoles.ADMIN));
    }
}
