package com.bootcamp.reto2.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class SedeRepository {
    private final JdbcTemplate jdbcTemplate;

    public SedeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> obtenerSedes() {
        String sql = "SELECT IDSEDE, DESCSEDE FROM SEDE";
        return jdbcTemplate.queryForList(sql);
    }
}
