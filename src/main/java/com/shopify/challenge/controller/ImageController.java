package com.shopify.challenge.controller;

import com.shopify.challenge.dto.ImageSliceDTO;
import com.shopify.challenge.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
public class ImageController {

    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/user/images")
    public ResponseEntity<?> getImages(@RequestParam(defaultValue = "0") Integer pageNum,
                                       @RequestParam(defaultValue = "25") Integer pageSize) {
        ImageSliceDTO imageSliceDTO = imageService.getAllImages(pageNum, pageSize);

        return new ResponseEntity<>(imageSliceDTO, HttpStatus.OK);
    }

    @PostMapping("/user/{username}/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("images") MultipartFile[] files, @PathVariable(value = "username") String username) {
        try {
            for (MultipartFile file : files) {
                imageService.storeImage(file, username);
            }
        } catch (Exception e) {
            log.error(e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/user/delete/{imageId}")
    public ResponseEntity<?> deleteImageUser(@PathVariable(value = "imageId") Long imageId) {
        try {
            imageService.safeDeleteImage(imageId);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/admin/delete/{imageId}")
    public ResponseEntity<?> deleteImageAdmin(@PathVariable(value = "imageId") Long imageId) {
        imageService.deleteImage(imageId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
