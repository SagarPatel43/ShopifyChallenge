package com.shopify.challenge.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ImageSliceDTO {

    private boolean hasNext;
    private List<ImageDTO> images;
}
