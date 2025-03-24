import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SedeService } from '../../../core/services/sede.service';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sede-dialog',
  standalone: true,
  templateUrl: './sede-dialog.component.html',
  styleUrls: ['./sede-dialog.component.scss'],
  imports: [MatSelectModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatInputModule, MatDialogModule]
})
export class SedeDialogComponent implements OnInit {

  sedeForm = new FormGroup({
    descSede: new FormControl('', [Validators.required])
  });

  constructor(
    private sedeService: SedeService,
    public dialogRef: MatDialogRef<SedeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log("Datos recibidos en el modal:", this.data);
    this.sedeForm.patchValue({
      descSede: this.data?.DESCSEDE || ''
    });
  }

  onSubmit() {
    if (this.sedeForm.valid) {
      if (!this.data || !this.data.IDSEDE) {
        this.registrarSede();
      } else {
        this.actualizarSede();
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  registrarSede() {
    this.sedeService.registrarSede(this.sedeForm.value).subscribe({
      next: (res) => {
        console.log('Sede creada:', res);
        this.dialogRef.close(true);
      },
      error: (err) => console.error('Error al crear sede:', err)
    });
  }

  actualizarSede() {
    let payload = {
      ...this.sedeForm.value,
      idSede: this.data.IDSEDE
    };

    this.sedeService.actualizarSede(payload).subscribe({
      next: (res) => {
        console.log("Sede actualizada correctamente:", res);
        this.dialogRef.close(true);
      },
      error: (err) => console.error("Error al actualizar sede:", err)
    });
  }
}
