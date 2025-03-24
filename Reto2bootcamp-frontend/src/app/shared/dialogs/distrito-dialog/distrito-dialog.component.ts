import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistritoService } from '../../../core/services/distrito.service';
import { ProvinciaService } from '../../../core/services/provincia.service';
import { Distrito } from '../../../core/models/distrito.model';
import { Provincia } from '../../../core/models/provincia.model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HospitalService } from '../../../core/services/hospital.service';

@Component({
  selector: 'app-distrito-dialog',
  standalone: true,
  templateUrl: './distrito-dialog.component.html',
  styleUrls: ['./distrito-dialog.component.scss'],
  imports: [ ReactiveFormsModule, CommonModule,MatInputModule, MatDialogModule, MatSelectModule]
})
export class DistritoDialogComponent implements OnInit {

  distritoForm = new FormGroup({
    descDistrito: new FormControl('', [Validators.required]),
    nombreProvincia: new FormControl('', [Validators.required])
  });

  provincias: any[] = [];

  constructor(
    private hospitalService: HospitalService,
    private distritoService: DistritoService,
    public dialogRef: MatDialogRef<DistritoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log("Datos recibidos en el modal:", this.data);
      this.distritoForm.patchValue({
        descDistrito: this.data?.DESCDISTRITO || '',
        nombreProvincia: this.data?.PROVINCIA || ''
      });
      this.loadDropdowns();
  }

  loadDropdowns() {
    this.hospitalService.getProvincias().subscribe(res => {
      this.provincias = res;
      this.setDropdownValue('nombreProvincia', this.data?.PROVINCIA, res, 'DESCPROVINCIA', 'IDPROVINCIA');
    });
  }

  setDropdownValue(controlName: string, selectedName: any, lista: any[], nameKey: string, idKey: string) {
    if (selectedName) {
      const itemEncontrado = lista.find(item => item[nameKey] === selectedName);
      if (itemEncontrado) {
        this.distritoForm.patchValue({ [controlName]: itemEncontrado[idKey] });
      } else {
        console.warn(`⚠ No se encontró coincidencia para ${controlName} con valor:`, selectedName);
      }
    }
  }
  
  onSubmit() {
    if (this.distritoForm.valid) {

      if (!this.data || !this.data.IDDISTRITO) {
        this.registrarDistrito();
      } else {
        this.actualizarDistrito();
      }
    }else {
      console.log('Formulario inválido');
    }
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  registrarDistrito() {
    this.distritoService.registrarDistrito(this.distritoForm.value).subscribe({
      next: (res) => {
        console.log('Distrito creado:', res);
        this.dialogRef.close(true);
      },
      error: (err) => console.error('Error al crear distrito:', err)
    });
  }
  
  actualizarDistrito() {
    let payload = {
      ...this.distritoForm.value,
      idDistrito: this.data.IDDISTRITO // Se asegura de incluir el ID del distrito
    };
  
    this.distritoService.actualizarDistrito(payload).subscribe({
      next: (res) => {
        console.log("Distrito actualizado correctamente:", res);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error("Error al actualizar distrito:", err);
      }
    });
  }

}

