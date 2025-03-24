import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GerenteService } from '../../core/services/gerente.service';
import { Gerente } from '../../core/models/gerente.model';
import { GerenteDialogComponent } from '../../shared/dialogs/gerente-dialog/gerente-dialog.component';
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
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, FormsModule, MatTableModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatSortModule]
})
export class GerenteComponent implements OnInit {
  
  displayedColumns: string[] = ['idGerente', 'nombre', 'acciones'];
  gerentes: Gerente[] = [];
  dataSource = new MatTableDataSource<Gerente>([]);

  constructor(
    private gerenteService: GerenteService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadGerentes();
  }

  loadGerentes() {
    this.gerenteService.listarGerentes().subscribe({
      next: (res) => { this.gerentes = res; this.dataSource = new MatTableDataSource(res); },
      error: (err) => console.error('Error al cargar gerentes:', err)
    });
  }

  addGerente() {
    const dialogRef = this.dialog.open(GerenteDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGerentes();
      }
    });
  }

  editGerente(gerente: Gerente) {
    const dialogRef = this.dialog.open(GerenteDialogComponent, {
      width: '400px',
      data: gerente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadGerentes();
    });
  }

  confirmDelete(idGerente: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Está seguro de que desea eliminar este gerente?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarGerente(idGerente);
      }
    });
  }

  eliminarGerente(idGerente: number) {
    console.log('Eliminando gerente con ID:', idGerente);
    this.gerenteService.eliminarGerente(idGerente).subscribe({
      next: () => {
        console.log('Gerente eliminado correctamente');
        this.loadGerentes();
      },
      error: (err) => console.error('Error al eliminar gerente:', err)
    });
  }
}
