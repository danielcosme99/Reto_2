package com.bootcamp.reto2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.reto2.model.Hospital;
import com.bootcamp.reto2.service.HospitalService;
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/hospitales")
public class HospitalController {
	
	
	

    @Autowired
    private HospitalService hospitalService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarHospital(@RequestBody Hospital hospital) {
        try {
            hospitalService.registrarHospital(hospital);
            return ResponseEntity.ok().body("✅ Hospital registrado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al registrar el hospital: " + e.getMessage());
        }
    }


    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizarHospital(@RequestBody Hospital hospital) {
    	try {
    		hospitalService.actualizarHospital(hospital);
            return ResponseEntity.ok().body("✅ Hospital actualizado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al actualizar datos del hospital: " + e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarHospital(@PathVariable Long id) {
    	try {
    		hospitalService.eliminarHospital(id);
            return ResponseEntity.ok().body("✅ Hospital eliminado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al eliminar el hospital: " + e.getMessage());
        }
    }
    
    @GetMapping("/listar")
    public ResponseEntity<List<Hospital>> listarHospitales(@RequestParam(defaultValue = "1") int formato) {
        List<Hospital> hospitales = hospitalService.listarHospitales();
        return ResponseEntity.ok(hospitales);
    }


}
