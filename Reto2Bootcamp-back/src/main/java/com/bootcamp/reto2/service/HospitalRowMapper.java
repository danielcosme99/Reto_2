package com.bootcamp.reto2.service;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.bootcamp.reto2.model.Hospital;


public class HospitalRowMapper implements RowMapper<Hospital> {
    @Override
    public Hospital mapRow(ResultSet rs, int rowNum) throws SQLException {
        Hospital hospital = new Hospital();
        hospital.setIdHospital(rs.getLong("IDHOSPITAL"));
        hospital.setNombre(rs.getString("NOMBRE"));
        hospital.setAntiguedad(rs.getInt("ANTIGUEDAD"));
        hospital.setArea(rs.getInt("AREA"));
        hospital.setNombreDistrito(rs.getString("DISTRITO"));
        hospital.setNombreSede(rs.getString("SEDE"));
        hospital.setNombreGerente(rs.getString("GERENTE"));
        hospital.setNombreCondicion(rs.getString("CONDICION"));
        return hospital;
    }
    
    
}
