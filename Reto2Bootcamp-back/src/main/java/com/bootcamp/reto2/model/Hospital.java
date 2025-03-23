package com.bootcamp.reto2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;




@Entity
@Table(name = "HOSPITAL")
public class Hospital {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idHospital;
    private String nombre;
    private int antiguedad;
    private int area;

    private Long idDistrito; // Se usará internamente
    private String nombreDistrito; // El usuario ingresará este campo

    private Long idGerente; // Se usará internamente
    private String nombreGerente; // El usuario ingresará este campo

    private Long idSede;
    private String nombreSede;
    
    private Long idCondicion;
    private String nombreCondicion;
    
    public Hospital() {
    }
    
    
	public Long getIdHospital() {
		return idHospital;
	}
	public void setIdHospital(Long idHospital) {
		this.idHospital = idHospital;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public int getAntiguedad() {
		return antiguedad;
	}
	public void setAntiguedad(int antiguedad) {
		this.antiguedad = antiguedad;
	}
	public int getArea() {
		return area;
	}
	public void setArea(int area) {
		this.area = area;
	}
	public Long getIdDistrito() {
		return idDistrito;
	}
	public void setIdDistrito(Long idDistrito) {
		this.idDistrito = idDistrito;
	}
	public String getNombreDistrito() {
		return nombreDistrito;
	}
	public void setNombreDistrito(String nombreDistrito) {
		this.nombreDistrito = nombreDistrito;
	}
	public Long getIdGerente() {
		return idGerente;
	}
	public void setIdGerente(Long idGerente) {
		this.idGerente = idGerente;
	}
	public String getNombreGerente() {
		return nombreGerente;
	}
	public void setNombreGerente(String nombreGerente) {
		this.nombreGerente = nombreGerente;
	}
	public Long getIdSede() {
		return idSede;
	}
	public void setIdSede(Long idSede) {
		this.idSede = idSede;
	}
	public Long getIdCondicion() {
		return idCondicion;
	}
	public void setIdCondicion(Long idCondicion) {
		this.idCondicion = idCondicion;
	}
	public String getNombreSede() {
		return nombreSede;
	}
	public void setNombreSede(String nombreSede) {
		this.nombreSede = nombreSede;
	}
	public String getNombreCondicion() {
		return nombreCondicion;
	}
	public void setNombreCondicion(String nombreCondicion) {
		this.nombreCondicion = nombreCondicion;
	}

    
}
