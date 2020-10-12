package com.shopify.challenge.repository.statistics;

import com.shopify.challenge.dto.statistics.SearchDTO;
import com.shopify.challenge.model.statistics.SearchImpression;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchImpressionRepository extends JpaRepository<SearchImpression, Long> {

    @Query(value = "SELECT new com.shopify.challenge.dto.statistics.SearchDTO(s.query, COUNT(s.query)) " +
                   "FROM SearchImpression as s " +
                   "GROUP BY s.query ORDER BY COUNT(s.query) DESC")
    List<SearchDTO> getTopSearches(Pageable page);
}
