package com.shopify.challenge.controller.statistics;

import com.shopify.challenge.model.statistics.ImageActions;
import com.shopify.challenge.service.statistics.ImpressionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImpressionController {

    private final ImpressionService impressionService;

    public ImpressionController(ImpressionService impressionService) {
        this.impressionService = impressionService;
    }

    @GetMapping("/user/view/{imageId}")
    public ResponseEntity<?> registerViewImpression(@PathVariable(value = "imageId") Long imageId) {
        try {
            impressionService.verifyImage(imageId);
            impressionService.registerImpression(ImageActions.VIEW, imageId);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/admin/statistics")
    public ResponseEntity<?> getStatistics() {
        return new ResponseEntity<>(impressionService.getStatistics(), HttpStatus.OK);
    }
}
