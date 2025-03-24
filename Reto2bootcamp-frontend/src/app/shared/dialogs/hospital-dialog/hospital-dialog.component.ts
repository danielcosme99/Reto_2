import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HospitalService } from '../../../core/services/hospital.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-hospital-dialog',
  standalone: true,
  templateUrl: './hospital-dialog.component.html',
  styleUrls: ['./hospital-dialog.component.scss'],
  imports: [MatButtonModule, ReactiveFormsModule, CommonModule, MatInputModule, MatDialogModule, MatSelectModule]
})
export class HospitalDialogComponent implements OnInit {

  hospitalForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    antiguedad: new FormControl('', [Validators.required, Validators.min(0)]),
    area: new FormControl('', [Validators.required, Validators.min(1)]),
    nombreSede: new FormControl('', [Validators.required]),
    nombreDistrito: new FormControl('', [Validators.required]),
    nombreGerente: new FormControl('', [Validators.required]),
    nombreCondicion: new FormControl('', [Validators.required])
  });

  sedes: any[] = [];
  distritos: any[] = [];
  gerentes: any[] = [];
  condiciones: any[] = [];

  constructor(
    private hospitalService: HospitalService,
    public dialogRef: MatDialogRef<HospitalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log("Datos recibidos en el modal:", this.data);
    this.hospitalForm.patchValue({
      nombre: this.data?.nombre || '',
      antiguedad: this.data?.antiguedad || '',
      area: this.data?.area || ''
    });
  
    this.loadDropdowns();
  }

  loadDropdowns() {
    this.hospitalService.getSedes().subscribe(res => {
      this.sedes = res;
      this.setDropdownValue('nombreSede', this.data?.nombreSede, res, 'DESCSEDE', 'IDSEDE');
    });

    this.hospitalService.listarDistritos().subscribe(res => {
      this.distritos = res;
      this.setDropdownValue('nombreDistrito', this.data?.nombreDistrito, res, 'DESCDISTRITO', 'IDDISTRITO');
    });

    this.hospitalService.getGerentes().subscribe(res => {
      this.gerentes = res;
      this.setDropdownValue('nombreGerente', this.data?.nombreGerente, res, 'DESCGERENTE', 'IDGERENTE');
    });

    this.hospitalService.getCondiciones().subscribe(res => {
      this.condiciones = res;
      this.setDropdownValue('nombreCondicion', this.data?.nombreCondicion, res, 'DESCCONDICION', 'IDCONDICION');
    });
  }
  
  setDropdownValue(controlName: string, selectedName: any, lista: any[], nameKey: string, idKey: string) {
    if (selectedName) {
      const itemEncontrado = lista.find(item => item[nameKey] === selectedName);
      if (itemEncontrado) {
        this.hospitalForm.patchValue({ [controlName]: itemEncontrado[idKey] });
      } else {
        console.warn(`⚠ No se encontró coincidencia para ${controlName} con valor:`, selectedName);
      }
    }
  }

  onSubmit() {
    if (this.hospitalForm.valid) {
      if (!this.data || !this.data.idHospital) {
        this.createHospital();
      } else {
        this.updateHospital();
      }
    } else {
      console.log('Formulario inválido');
    }
  }
  

  onCancel() {
    this.dialogRef.close(false);
  }

  createHospital() {
    this.hospitalService.registrarHospital(this.hospitalForm.value).subscribe({
      next: (res) => {
        console.log("Hospital registrado:", res);
        this.dialogRef.close(true); // Cerramos el modal solo si el registro fue exitoso
      },
      error: (error) => {
        console.error("Error al registrar hospital:", error);
      }
    });
  }

  updateHospital() {
    let payload = {
      ...this.hospitalForm.value,
      idHospital: this.data.idHospital
    };
  
    this.hospitalService.actualizarHospital(payload).subscribe({
      next: (res) => {
        console.log("Hospital actualizado correctamente:", res);
        this.dialogRef.close(true); 
      },
      error: (error) => {
        console.error("Error al actualizar hospital:", error);
      }
    });
  }
  
}

