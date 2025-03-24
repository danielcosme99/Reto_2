package com.bootcamp.reto2.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import com.bootcamp.reto2.model.Distrito;

public class DistritoRowMapper implements RowMapper<Distrito> {
    @Override
    public Distrito mapRow(ResultSet rs, int rowNum) throws SQLException {
        Distrito distrito = new Distrito();
        distrito.setIdDistrito(rs.getLong("IDDISTRITO"));
        distrito.setNombreProvincia(rs.getString("PROVINCIA"));
        distrito.setDescDistrito(rs.getString("DISTRITO"));
        return distrito;
    }
}
