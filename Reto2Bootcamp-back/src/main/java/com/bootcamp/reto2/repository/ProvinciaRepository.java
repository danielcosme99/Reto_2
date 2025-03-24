package com.bootcamp.reto2.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class ProvinciaRepository {
    private final JdbcTemplate jdbcTemplate;

    public ProvinciaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> obtenerProvincias() {
        String sql = "SELECT IDPROVINCIA, DESCPROVINCIA FROM PROVINCIA";
        return jdbcTemplate.queryForList(sql);
    }
}
