import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GerenteService } from '../../../core/services/gerente.service';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-gerente-dialog',
  standalone: true,
  templateUrl: './gerente-dialog.component.html',
  styleUrls: ['./gerente-dialog.component.scss'],
  imports: [MatButtonModule,MatSelectModule,ReactiveFormsModule, CommonModule, MatInputModule, MatDialogModule]
})
export class GerenteDialogComponent implements OnInit {

  gerenteForm = new FormGroup({
    descGerente: new FormControl('', [Validators.required])
  });

  constructor(
    private gerenteService: GerenteService,
    public dialogRef: MatDialogRef<GerenteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log("Datos recibidos en el modal:", this.data);
    this.gerenteForm.patchValue({
      descGerente: this.data?.DESCGERENTE || ''
    });
  }

  onSubmit() {
    if (this.gerenteForm.valid) {
      if (!this.data || !this.data.IDGERENTE) {
        this.registrarGerente();
      } else {
        this.actualizarGerente();
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  registrarGerente() {
    this.gerenteService.registrarGerente(this.gerenteForm.value).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error al crear gerente:', err)
    });
  }

  actualizarGerente() {
    let payload = { ...this.gerenteForm.value, idGerente: this.data.IDGERENTE };

    this.gerenteService.actualizarGerente(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error("Error al actualizar gerente:", err)
    });
  }
}
