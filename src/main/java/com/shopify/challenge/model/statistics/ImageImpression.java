package com.shopify.challenge.model.statistics;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class ImageImpression {

    @Id
    @GeneratedValue
    Long id;
    @NonNull
    private LocalDateTime time;
    @NonNull
    private String action;
    @NonNull
    @Column(name = "user_id")
    private Long userId;
    @NonNull
    @Column(name = "image_id")
    private Long imageId;
}
