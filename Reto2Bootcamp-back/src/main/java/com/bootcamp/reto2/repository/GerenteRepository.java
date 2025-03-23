package com.bootcamp.reto2.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class GerenteRepository {
    private final JdbcTemplate jdbcTemplate;

    public GerenteRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> obtenerGerentes() {
        String sql = "SELECT IDGERENTE, DESCGerente FROM GERENTE";
        return jdbcTemplate.queryForList(sql);
    }
}
