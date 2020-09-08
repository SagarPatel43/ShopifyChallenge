package com.shopify.challenge.repository;

import com.shopify.challenge.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {

}
