package com.shopify.challenge.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopUploaderDTO {
    private String uploaderName;
    private Long uploadCount;
    private String role;
}