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

import com.bootcamp.reto2.model.Condicion;
import com.bootcamp.reto2.service.CondicionService;

@RestController
@RequestMapping("/api/condiciones")
@CrossOrigin(origins = "http://localhost:4200")
public class CondicionController {
    private final CondicionService condicionService;

    public CondicionController(CondicionService condicionService) {
        this.condicionService = condicionService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarCondicion(@RequestBody Condicion condicion) {
        try {
            condicionService.registrarCondicion(condicion);
            return ResponseEntity.ok("✅ Condición registrada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al registrar condición: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizarCondicion(@RequestBody Condicion condicion) {
        try {
            condicionService.actualizarCondicion(condicion);
            return ResponseEntity.ok("✅ Condición actualizada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al actualizar condición: " + e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarCondicion(@PathVariable Long id) {
        try {
            condicionService.eliminarCondicion(id);
            return ResponseEntity.ok("✅ Condición eliminada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al eliminar condición: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Map<String, Object>>> listarCondiciones() {
        return ResponseEntity.ok(condicionService.listarCondiciones());
    }
}
