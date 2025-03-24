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

import com.bootcamp.reto2.model.Gerente;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class GerenteService {
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcCall jdbcCall;

    @Autowired
    public GerenteService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.jdbcCall = new SimpleJdbcCall(jdbcTemplate)
            .withProcedureName("SP_GERENTE_LISTAR")
            .declareParameters(
                new SqlOutParameter("p_cursor", OracleTypes.CURSOR) // Verifica el nombre del parámetro en la BD
            );
    }

    public void registrarGerente(Gerente gerente) {
        jdbcTemplate.update("CALL SP_GERENTE_REGISTRAR(?)", 
             gerente.getDescGerente());
    }

    public void actualizarGerente(Gerente gerente) {
        jdbcTemplate.update("CALL SP_GERENTE_ACTUALIZAR(?, ?)", 
            gerente.getIdGerente(), gerente.getDescGerente());
    }

    public void eliminarGerente(Long idGerente) {
        jdbcTemplate.update("CALL SP_GERENTE_ELIMINAR(?)", idGerente);
    }

    public List<Map<String, Object>> listarGerentes() {
        Map<String, Object> result = jdbcCall.execute();
        return (List<Map<String, Object>>) result.get("p_cursor");  
    }
}

