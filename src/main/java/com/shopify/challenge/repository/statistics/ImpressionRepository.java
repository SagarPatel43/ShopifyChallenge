package com.shopify.challenge.repository.statistics;

import com.shopify.challenge.dto.statistics.TopImageDTO;
import com.shopify.challenge.dto.statistics.TopUploaderDTO;
import com.shopify.challenge.model.statistics.ImageImpression;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImpressionRepository extends JpaRepository<ImageImpression, Long> {

    @Query(value = "SELECT new com.shopify.challenge.dto.statistics.TopUploaderDTO(u.username, COUNT(u.username), u.role) " +
                   "FROM ImageImpression as imp, User as u " +
                   "WHERE imp.action='Upload' AND imp.userId=u.id " +
                   "GROUP BY u.username ORDER BY COUNT(u.username) DESC")
    List<TopUploaderDTO> getTopUploaders(Pageable page);

    @Query(value = "SELECT new com.shopify.challenge.dto.statistics.TopImageDTO(i.name, COUNT(i.name)) " +
                   "FROM ImageImpression as imp, Image as i " +
                   "WHERE imp.action='View' AND imp.imageId=i.id " +
                   "GROUP BY i.name ORDER BY COUNT(i.name) DESC")
    List<TopImageDTO> getTopImages(Pageable page);

    Long countByAction(String action);
}
