package com.shopify.challenge.service.statistics;

import com.shopify.challenge.dto.statistics.StatisticsDTO;
import com.shopify.challenge.model.User;
import com.shopify.challenge.model.statistics.ImageActions;
import com.shopify.challenge.model.statistics.ImageImpression;
import com.shopify.challenge.model.statistics.SearchImpression;
import com.shopify.challenge.repository.ImageRepository;
import com.shopify.challenge.repository.UserRepository;
import com.shopify.challenge.repository.statistics.ImpressionRepository;
import com.shopify.challenge.repository.statistics.SearchImpressionRepository;
import com.shopify.challenge.util.UserUtil;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ImpressionService {

    private final ImpressionRepository impressionRepository;
    private final SearchImpressionRepository searchImpressionRepository;
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    public ImpressionService(ImpressionRepository impressionRepository, SearchImpressionRepository searchImpressionRepository,
                             ImageRepository imageRepository, UserRepository userRepository) {
        this.impressionRepository = impressionRepository;
        this.searchImpressionRepository = searchImpressionRepository;
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
    }

    public void registerImpression(String action, Long userId, Long imageId) {
        ImageImpression imageImpression = new ImageImpression(LocalDateTime.now(), action, userId, imageId);
        impressionRepository.save(imageImpression);
    }

    public void registerImpression(String action, Long imageId) throws Exception {
        User user = userRepository.findByUsername(UserUtil.getUsername()).orElseThrow(Exception::new);
        registerImpression(action, user.getId(), imageId);
    }

    public void registerSearch(String query) throws Exception{
        User user = userRepository.findByUsername(UserUtil.getUsername()).orElseThrow(Exception::new);
        SearchImpression searchImpression = new SearchImpression(LocalDateTime.now(), user.getId(), query);
        searchImpressionRepository.save(searchImpression);
    }

    public void verifyImage(Long imageId) throws Exception {
        imageRepository.findById(imageId).orElseThrow(Exception::new);
    }

    public StatisticsDTO getStatistics() {
        Pageable limit = PageRequest.of(0, 5);

        return StatisticsDTO.builder()
                .totalImages(imageRepository.count())
                .totalUploads(impressionRepository.countByAction(ImageActions.UPLOAD))
                .totalDeletes(impressionRepository.countByAction(ImageActions.DELETE))
                .totalViews(impressionRepository.countByAction(ImageActions.VIEW))
                .topViewedImages(impressionRepository.getTopImages(limit))
                .topUploaders(impressionRepository.getTopUploaders(limit))
                .topSearches(searchImpressionRepository.getTopSearches(limit))
                .build();
    }
}
