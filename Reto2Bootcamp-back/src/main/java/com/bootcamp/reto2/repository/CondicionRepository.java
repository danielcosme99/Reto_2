package com.bootcamp.reto2.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class CondicionRepository {
    private final JdbcTemplate jdbcTemplate;

    public CondicionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> obtenerCondiciones() {
        String sql = "SELECT IDCONDICION, DESCCONDICION FROM CONDICION";
        return jdbcTemplate.queryForList(sql);
    }
}
