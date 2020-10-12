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
public class SearchImpression {

    @Id
    @GeneratedValue
    Long id;
    @NonNull
    private LocalDateTime time;
    @NonNull
    @Column(name = "user_id")
    private Long userId;
    @NonNull
    private String query;
}
