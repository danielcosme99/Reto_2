import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HospitalService } from '../../../core/services/hospital.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, CommonModule]
})
export class DeleteHospitalDialogComponent {
  constructor(
    private hospitalService: HospitalService,
    public dialogRef: MatDialogRef<DeleteHospitalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idHospital: number }
  ) {}

  onConfirm() {
    this.hospitalService.eliminarHospital(this.data.idHospital).subscribe(() => this.dialogRef.close(true))
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}