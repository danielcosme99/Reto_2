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

import com.bootcamp.reto2.model.Distrito;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class DistritoService {
    private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcCall jdbcCall;

    @Autowired
    public DistritoService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.jdbcCall = new SimpleJdbcCall(jdbcTemplate)
            .withProcedureName("SP_DISTRITO_LISTAR")
            .declareParameters(
                new SqlOutParameter("p_cursor", OracleTypes.CURSOR) // Verifica el nombre del parámetro en la BD
            );
    }

    public void registrarDistrito(Distrito distrito) {
        jdbcTemplate.update("CALL SP_DISTRITO_REGISTRAR(?, ?)", 
            distrito.getNombreProvincia(), distrito.getDescDistrito());
    }

    public void actualizarDistrito(Distrito distrito) {
        jdbcTemplate.update("CALL SP_DISTRITO_ACTUALIZAR(?, ?, ?)", 
            distrito.getIdDistrito(), distrito.getNombreProvincia(), distrito.getDescDistrito());
    }

    public void eliminarDistrito(Long idDistrito) {
        jdbcTemplate.update("CALL SP_DISTRITO_ELIMINAR(?)", idDistrito);
    }

    public List<Distrito> listarDistritos() {
        Map<String, Object> result = jdbcCall.execute();
        return (List<Distrito>) result.get("p_cursor");  
    }
}
