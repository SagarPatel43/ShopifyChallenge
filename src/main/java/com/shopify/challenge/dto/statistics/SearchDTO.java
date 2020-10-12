package com.shopify.challenge.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SearchDTO {
    private String query;
    private Long queryCount;
}
