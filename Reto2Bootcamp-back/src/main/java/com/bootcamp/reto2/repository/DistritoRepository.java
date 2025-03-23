package com.bootcamp.reto2.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class DistritoRepository {
    private final JdbcTemplate jdbcTemplate;

    public DistritoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> obtenerDistritos() {
        String sql = "SELECT IDDISTRITO, DESCDISTRITO FROM DISTRITO";
        return jdbcTemplate.queryForList(sql);
    }
}
