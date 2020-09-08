package com.shopify.challenge.model;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class Image {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private String path;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    @NonNull
    private User user;
}
