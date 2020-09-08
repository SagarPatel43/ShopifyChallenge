package com.shopify.challenge.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ImageDTO {

    private Long id;
    private String name;
    private String url;
    private String uploader;
}
