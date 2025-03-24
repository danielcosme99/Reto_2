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

import com.bootcamp.reto2.model.Distrito;
import com.bootcamp.reto2.service.DistritoService;

@RestController
@RequestMapping("/api/distritos")
@CrossOrigin(origins = "http://localhost:4200")
public class DistritoController {
    private final DistritoService distritoService;

    public DistritoController(DistritoService distritoService) {
        this.distritoService = distritoService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarDistrito(@RequestBody Distrito distrito) {
        try {
            distritoService.registrarDistrito(distrito);
            return ResponseEntity.ok("✅ Distrito registrado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al registrar distrito: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizarDistrito(@RequestBody Distrito distrito) {
        try {
            distritoService.actualizarDistrito(distrito);
            return ResponseEntity.ok("✅ Distrito actualizado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al actualizar distrito: " + e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarDistrito(@PathVariable Long id) {
        try {
            distritoService.eliminarDistrito(id);
            return ResponseEntity.ok("✅ Distrito eliminado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al eliminar distrito: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Distrito>> listarDistritos() {
        return ResponseEntity.ok(distritoService.listarDistritos());
    }
}
