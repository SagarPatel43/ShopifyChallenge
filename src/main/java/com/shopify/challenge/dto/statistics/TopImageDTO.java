package com.shopify.challenge.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopImageDTO {
    private String imageName;
    private Long imageViews;
}