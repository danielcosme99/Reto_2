import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { CondicionDialogComponent } from '../../shared/dialogs/condicion-dialog/condicion-dialog.component';
import { CondicionService } from '../../core/services/condicion.service';
import { Condicion } from '../../core/models/condicion.model';
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
  selector: 'app-condicion',
  templateUrl: './condicion.component.html',
  styleUrls: ['./condicion.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, FormsModule, MatTableModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatSortModule]
})
export class CondicionComponent {
  loadingChangeState: boolean = false;
  displayedColumns: string[] = ['IDCONDICION', 'DESCCONDICION', 'acciones'];
  condiciones: Condicion[] = [];
  dataSource = new MatTableDataSource<Condicion>([]);

  terminoBusqueda: string = '';
  criterioSeleccionado: keyof Condicion = 'DESCCONDICION'; 

  setCriterioSeleccionado(nuevoCriterio: keyof Condicion) {
      this.criterioSeleccionado = nuevoCriterio;
      this.terminoBusqueda = '';
      this.aplicarFiltro(); 
    }

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private condicionService: CondicionService
  ) {}

  ngOnInit() {
    this.loadCondiciones();
  }

  loadCondiciones() {
    this.condicionService.listarCondiciones().subscribe(
      (res: Condicion[]) => {
        this.condiciones = res;
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
      this.dataSource.filterPredicate = (data: Condicion, filtro: string) => {
        const valor = (data[this.criterioSeleccionado] as string)?.toLowerCase();
        return valor?.includes(filtro);
      };
      console.log('filtro', filtro);
    }

  addCondicion() {
    const dialogRef = this.dialog.open(CondicionDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCondiciones();
      }
    });
  }

  editCondicion(condicion: Condicion) {
    const dialogRef = this.dialog.open(CondicionDialogComponent, {
      width: '400px',
      data: condicion
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadCondiciones();
    });
  }

  confirmDelete(idCondicion: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Está seguro de que desea eliminar esta condición?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarCondicion(idCondicion);
      }
    });
  }

  eliminarCondicion(idCondicion: number) {
    this.condicionService.eliminarCondicion(idCondicion).subscribe({
      next: () => {
        console.log('Condición eliminada correctamente');
        this.loadCondiciones();
      },
      error: (err) => console.error('Error al eliminar condición:', err)
    });
  }
}

