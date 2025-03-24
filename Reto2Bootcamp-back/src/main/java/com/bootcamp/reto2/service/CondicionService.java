package com.bootcamp.reto2.service;

import java.util.List;
import java.util.Map;

import org.hibernate.dialect.OracleTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bootcamp.reto2.model.Condicion;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class CondicionService {
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcCall jdbcCall;

    @Autowired
    public CondicionService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.jdbcCall = new SimpleJdbcCall(jdbcTemplate)
            .withProcedureName("SP_CONDICION_LISTAR")
            .declareParameters(
                new SqlOutParameter("p_cursor", OracleTypes.CURSOR) // Verifica el nombre del parámetro en la BD
            );
    }

    public void registrarCondicion(Condicion condicion) {
        jdbcTemplate.update("CALL SP_CONDICION_REGISTRAR(?)", 
             condicion.getDescCondicion());
    }

    public void actualizarCondicion(Condicion condicion) {
        jdbcTemplate.update("CALL SP_CONDICION_ACTUALIZAR(?, ?)", 
            condicion.getIdCondicion(), condicion.getDescCondicion());
    }

    public void eliminarCondicion(Long idCondicion) {
        jdbcTemplate.update("CALL SP_CONDICION_ELIMINAR(?)", idCondicion);
    }

    public List<Map<String, Object>> listarCondiciones() {
        Map<String, Object> result = jdbcCall.execute();
        return (List<Map<String, Object>>) result.get("p_cursor");  
    }
}
