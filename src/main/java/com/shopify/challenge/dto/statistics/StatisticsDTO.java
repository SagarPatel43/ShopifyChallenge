package com.shopify.challenge.dto.statistics;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StatisticsDTO {

    private long totalImages;
    private long totalUploads;
    private long totalDeletes;
    private long totalViews;

    private List<TopImageDTO> topViewedImages;
    private List<TopUploaderDTO> topUploaders;
    private List<SearchDTO> topSearches;
}
