import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SedeService } from '../../core/services/sede.service';
import { Sede } from '../../core/models/sede.model';
import { SedeDialogComponent } from '../../shared/dialogs/sede-dialog/sede-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, FormsModule, MatTableModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatSortModule]
})
export class SedeComponent implements OnInit {
  
  displayedColumns: string[] = ['idSede', 'nombre', 'acciones'];
  sedes: Sede[] = [];
  dataSource = new MatTableDataSource<Sede>([]);

  constructor(
    private sedeService: SedeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadSedes();
  }

  loadSedes() {
    this.sedeService.listarSedes().subscribe({
      next: (res) => { this.sedes = res; this.dataSource = new MatTableDataSource(res); },
      error: (err) => console.error('Error al cargar sedes:', err)
    });
  }

  addSede() {
    const dialogRef = this.dialog.open(SedeDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSedes();
      }
    });
  }

  editSede(sede: Sede) {
    const dialogRef = this.dialog.open(SedeDialogComponent, {
      width: '400px',
      data: sede
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadSedes();
    });
  }

  confirmDelete(idSede: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Está seguro de que desea eliminar esta sede?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarSede(idSede);
      }
    });
  }

  eliminarSede(idSede: number) {
    console.log('Eliminando sede con ID:', idSede);
    this.sedeService.eliminarSede(idSede).subscribe({
      next: () => {
        console.log('Sede eliminada correctamente');
        this.loadSedes();
      },
      error: (err) => console.error('Error al eliminar sede:', err)
    });
  }
}
