package com.shopify.challenge.repository;

import com.shopify.challenge.model.Image;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.CrudRepository;

public interface ImageRepository extends CrudRepository<Image, Long> {
    Slice<Image> findAll(Pageable pageable);
}
