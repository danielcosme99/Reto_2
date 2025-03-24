import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ProvinciaService } from '../../../core/services/provincia.service';
import { Provincia } from '../../../core/models/provincia.model';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HospitalService } from '../../../core/services/hospital.service';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-provincia-dialog',
  templateUrl: './provincia-dialog.component.html',
  styleUrls: ['./provincia-dialog.component.scss'],
  imports: [MatButtonModule, ReactiveFormsModule, CommonModule, MatInputModule, MatDialogModule, MatSelectModule]
})
export class ProvinciaDialogComponent implements OnInit {

  provinciaForm = new FormGroup({
    descProvincia: new FormControl('', [Validators.required])
  });

  constructor(
    private provinciaService: ProvinciaService,
    public dialogRef: MatDialogRef<ProvinciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.provinciaForm.patchValue({
      descProvincia: this.data?.DESCPROVINCIA || ''
    });
  }

  onSubmit() {
    if (this.provinciaForm.valid) {
      if (!this.data || !this.data.IDPROVINCIA) {
        this.registrarProvincia();
      } else {
        this.actualizarProvincia();
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  registrarProvincia() {
    this.provinciaService.registrarProvincia(this.provinciaForm.value).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error al registrar provincia:', err)
    });
  }

  actualizarProvincia() {
    let payload = { ...this.provinciaForm.value, idProvincia: this.data.IDPROVINCIA };

    this.provinciaService.actualizarProvincia(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error al actualizar provincia:', err)
    });
  }
}
