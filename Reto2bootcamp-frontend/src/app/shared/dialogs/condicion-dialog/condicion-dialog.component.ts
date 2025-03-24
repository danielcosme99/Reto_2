import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CondicionService } from '../../../core/services/condicion.service';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-condicion-dialog',
  standalone: true,
  templateUrl: './condicion-dialog.component.html',
  styleUrls: ['./condicion-dialog.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatDialogModule]
})
export class CondicionDialogComponent implements OnInit {

  condicionForm = new FormGroup({
    descCondicion: new FormControl('', [Validators.required])
  });

  constructor(
    private condicionService: CondicionService,
    public dialogRef: MatDialogRef<CondicionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.condicionForm.patchValue({
      descCondicion: this.data?.DESCCONDICION || ''
    });
  }

  onSubmit() {
    if (this.condicionForm.valid) {
      if (!this.data || !this.data.IDCONDICION) {
        this.registrarCondicion();
      } else {
        this.actualizarCondicion();
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  registrarCondicion() {
    this.condicionService.registrarCondicion(this.condicionForm.value).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error al crear condición:', err)
    });
  }

  actualizarCondicion() {
    let payload = { ...this.condicionForm.value, idCondicion: this.data.IDCONDICION };

    this.condicionService.actualizarCondicion(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error("Error al actualizar condición:", err)
    });
  }
}
