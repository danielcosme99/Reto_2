import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { SedeService } from '../../core/services/sede.service';
import { Sede } from '../../core/models/sede.model';
import { SedeDialogComponent } from '../../shared/dialogs/sede-dialog/sede-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, FormsModule, MatTableModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatSortModule]
})
export class SedeComponent implements OnInit {
  loadingChangeState: boolean = false;
  displayedColumns: string[] = ['IDSEDE', 'DESCSEDE', 'acciones'];
  sedes: Sede[] = [];
  dataSource = new MatTableDataSource<Sede>([]);

  terminoBusqueda: string = '';
  criterioSeleccionado: keyof Sede = 'DESCSEDE'; 

  setCriterioSeleccionado(nuevoCriterio: keyof Sede) {
        this.criterioSeleccionado = nuevoCriterio;
        this.terminoBusqueda = '';
        this.aplicarFiltro(); 
      }

      @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sedeService: SedeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadSedes();
  }

  loadSedes() {
      this.sedeService.listarSedes().subscribe(
        (res: Sede[]) => {
          this.sedes = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error("Error al obtener condiciones", error);
        }
      );
    }

    aplicarFiltro() {
          const filtro = this.terminoBusqueda.toLowerCase().trim();
          this.dataSource.filter = filtro;
          this.dataSource.filterPredicate = (data: Sede, filtro: string) => {
            const valor = (data[this.criterioSeleccionado] as string)?.toLowerCase();
            return valor?.includes(filtro);
          };
          console.log('filtro', filtro);
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
