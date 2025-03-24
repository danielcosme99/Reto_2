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

import com.bootcamp.reto2.model.Provincia;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ProvinciaService {
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcCall jdbcCall;

    @Autowired
    public ProvinciaService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.jdbcCall = new SimpleJdbcCall(jdbcTemplate)
            .withProcedureName("SP_PROVINCIA_LISTAR")
            .declareParameters(
                new SqlOutParameter("p_cursor", OracleTypes.CURSOR) // Asegúrate de que el procedimiento devuelve un cursor
            );
    }

    public void registrarProvincia(Provincia provincia) {
        jdbcTemplate.update("CALL SP_PROVINCIA_REGISTRAR(?)", 
             provincia.getDescProvincia());
    }

    public void actualizarProvincia(Provincia provincia) {
        jdbcTemplate.update("CALL SP_PROVINCIA_ACTUALIZAR(?, ?)", 
            provincia.getIdProvincia(), provincia.getDescProvincia());
    }

    public void eliminarProvincia(Long idProvincia) {
        jdbcTemplate.update("CALL SP_PROVINCIA_ELIMINAR(?)", idProvincia);
    }

    public List<Map<String, Object>> listarProvincias() {
        Map<String, Object> result = jdbcCall.execute();
        return (List<Map<String, Object>>) result.get("p_cursor");  
    }
}
