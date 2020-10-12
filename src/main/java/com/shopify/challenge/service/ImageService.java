package com.shopify.challenge.service;

import com.shopify.challenge.dto.ImageDTO;
import com.shopify.challenge.dto.ImageSliceDTO;
import com.shopify.challenge.model.Image;
import com.shopify.challenge.model.User;
import com.shopify.challenge.model.statistics.ImageActions;
import com.shopify.challenge.repository.ImageRepository;
import com.shopify.challenge.repository.UserRepository;
import com.shopify.challenge.service.statistics.ImpressionService;
import com.shopify.challenge.util.UserUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ImageService {

    @Value("${upload.location}")
    private String uploadLocation;
    @Value("${file.server.url}")
    private String serverUrl;
    @Value("${file.server.port}")
    private String serverPort;

    private final ImageRepository imageRepository;
    private final UserRepository userRepository;
    private final ImpressionService impressionService;

    @Autowired
    public ImageService(ImageRepository imageRepository, UserRepository userRepository, ImpressionService impressionService) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
        this.impressionService = impressionService;
    }

    public ImageSliceDTO getAllImages(String query, Integer pageNum, Integer pageSize) {
        Pageable page = PageRequest.of(pageNum, pageSize);
        Slice<Image> images;
        // Is this a search
        if (query == null) {
            images = imageRepository.findAll(page);
        } else {
            images = imageRepository.findByNameContainingIgnoreCase(query, page);

            try {
                impressionService.registerSearch(query);
            } catch (Exception e) {
                log.error(e.toString());
            }
        }

        List<ImageDTO> imageDTOs = images.getContent().stream()
                .map(image -> new ImageDTO(image.getId(), image.getName(), image.getPath(), image.getUser().getUsername()))
                .collect(Collectors.toList());

        return new ImageSliceDTO(images.hasNext(), imageDTOs);
    }

    public void storeImage(MultipartFile file) throws Exception {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        // Deny empty files, file names that attempt path traversal, and non-image files
        if (file.isEmpty() || fileName.contains("..") || !Objects.requireNonNull(file.getContentType()).contains("image")) {
            throw new IOException("Invalid file");
        }

        String serverPath = "http://" + serverUrl + ":" + serverPort + "/" + fileName;
        Path uploadPath = Paths.get(uploadLocation).resolve(Objects.requireNonNull(fileName));
        file.transferTo(uploadPath);
        log.info("File " + fileName + " successfully saved to " + uploadPath);

        User user = userRepository.findByUsername(UserUtil.getUsername()).orElseThrow(Exception::new);
        Image image = imageRepository.save(new Image(fileName, serverPath, user));

        impressionService.registerImpression(ImageActions.UPLOAD, user.getId(), image.getId());
    }

    public void deleteImage(Long id) throws Exception {
        Image image = imageRepository.findById(id).orElseThrow(Exception::new);

        imageRepository.delete(image);

        impressionService.registerImpression(ImageActions.DELETE, image.getId());
    }

    public void safeDeleteImage(Long imageId) throws Exception {
        Image image = imageRepository.findById(imageId).orElseThrow(Exception::new);
        User user = userRepository.findByUsername(UserUtil.getUsername()).orElseThrow(Exception::new);

        if (!image.getUser().getId().equals(user.getId())) {
            throw new Exception();
        }

        imageRepository.delete(image);

        impressionService.registerImpression(ImageActions.DELETE, user.getId(), image.getId());
    }
}
