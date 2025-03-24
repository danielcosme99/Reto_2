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

import com.bootcamp.reto2.model.Sede;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class SedeService {
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcCall jdbcCall;

    @Autowired
    public SedeService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.jdbcCall = new SimpleJdbcCall(jdbcTemplate)
            .withProcedureName("SP_SEDE_LISTAR")
            .declareParameters(
                new SqlOutParameter("p_cursor", OracleTypes.CURSOR) // Verifica que SP_SEDE_LISTAR devuelva un cursor
            );
    }

    public void registrarSede(Sede sede) {
        jdbcTemplate.update("CALL SP_SEDE_REGISTRAR(?)", 
             sede.getDescSede());
    }

    public void actualizarSede(Sede sede) {
        jdbcTemplate.update("CALL SP_SEDE_ACTUALIZAR(?, ?)", 
            sede.getIdSede(), sede.getDescSede());
    }

    public void eliminarSede(Long idSede) {
        jdbcTemplate.update("CALL SP_SEDE_ELIMINAR(?)", idSede);
    }

    public List<Map<String, Object>> listarSedes() {
        Map<String, Object> result = jdbcCall.execute();
        return (List<Map<String, Object>>) result.get("p_cursor");  
    }
}
