package com.bootcamp.reto2.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.reto2.model.Provincia;
import com.bootcamp.reto2.service.ProvinciaService;

@RestController
@RequestMapping("/api/provincias")
@CrossOrigin(origins = "http://localhost:4200")
public class ProvinciaController {
    private final ProvinciaService provinciaService;

    public ProvinciaController(ProvinciaService provinciaService) {
        this.provinciaService = provinciaService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarProvincia(@RequestBody Provincia provincia) {
        try {
            provinciaService.registrarProvincia(provincia);
            return ResponseEntity.ok("✅ Provincia registrada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al registrar provincia: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizarProvincia(@RequestBody Provincia provincia) {
        try {
            provinciaService.actualizarProvincia(provincia);
            return ResponseEntity.ok("✅ Provincia actualizada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al actualizar provincia: " + e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarProvincia(@PathVariable Long id) {
        try {
            provinciaService.eliminarProvincia(id);
            return ResponseEntity.ok("✅ Provincia eliminada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al eliminar provincia: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Map<String, Object>>> listarProvincias() {
        return ResponseEntity.ok(provinciaService.listarProvincias());
    }
}
