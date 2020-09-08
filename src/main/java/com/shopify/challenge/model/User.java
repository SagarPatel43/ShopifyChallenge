package com.shopify.challenge.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue
    Long id;
    @NonNull
    private String username;
    @NonNull
    private String password;
    @NonNull
    private String role;
    @OneToMany(mappedBy="user")
    private Set<Image> images;
}
