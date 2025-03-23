package com.bootcamp.reto2.service;

import java.sql.CallableStatement;
import java.sql.Types;
import java.util.List;
import java.util.Map;

import org.hibernate.dialect.OracleTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bootcamp.reto2.model.Hospital;


@Service
@Transactional(propagation = Propagation.REQUIRED)
public class HospitalService {

	private final JdbcTemplate jdbcTemplate;
    private final SimpleJdbcCall jdbcCall;
   
    
    @Autowired
    public HospitalService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.jdbcCall = new SimpleJdbcCall(jdbcTemplate)
            .withProcedureName("SP_HOSPITAL_LISTAR")
            .declareParameters(
                new SqlOutParameter("p_cursor", OracleTypes.CURSOR, new HospitalRowMapper())
            );
    }
    
    public void registrarHospital(Hospital hospital) {
    	
    	jdbcTemplate.update("CALL SP_HOSPITAL_REGISTRAR(?, ?, ?, ?, ?, ?, ?)",
                hospital.getNombreDistrito(),  
                hospital.getNombre(),
                hospital.getAntiguedad(),
                hospital.getArea(),
                hospital.getNombreSede(),  
                hospital.getNombreGerente(), 
                hospital.getNombreCondicion()  
        );
    }

    public void actualizarHospital(Hospital hospital) {
        jdbcTemplate.update("CALL SP_HOSPITAL_ACTUALIZAR(?, ?, ?, ?, ?, ?, ?, ?)",
            hospital.getIdHospital(),
            hospital.getNombreDistrito(),
            hospital.getNombre(),
            hospital.getAntiguedad(),
            hospital.getArea(),
            hospital.getNombreSede(),
            hospital.getNombreGerente(),
            hospital.getNombreCondicion()
        );
    }


    public void eliminarHospital(Long idHospital) {
        jdbcTemplate.update("CALL SP_HOSPITAL_ELIMINAR(?)", idHospital);
    }
    
  

    public List<Hospital> listarHospitales() {
       
        Map<String, Object> result = jdbcCall.execute();
        return (List<Hospital>) result.get("p_cursor");
    }


}
