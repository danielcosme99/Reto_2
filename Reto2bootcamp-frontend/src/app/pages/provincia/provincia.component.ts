import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProvinciaService } from '../../core/services/provincia.service';
import { Provincia } from '../../core/models/provincia.model';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ProvinciaDialogComponent } from '../../shared/dialogs/provincia-dialog/provincia-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, FormsModule, MatTableModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatSortModule]
})
export class ProvinciaComponent implements OnInit {
  displayedColumns: string[] = ['idProvincia', 'descProvincia', 'acciones'];
  provincias: Provincia[] = [];
  dataSource = new MatTableDataSource<Provincia>([]);

  constructor(
    private provinciaService: ProvinciaService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProvincias();
  }

  loadProvincias() {
    this.provinciaService.listarProvincias().subscribe({
      next: (res) => {
        this.provincias = res;
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => console.error('Error al cargar provincias:', err)
    });
  }

  addProvincia() {
    const dialogRef = this.dialog.open(ProvinciaDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProvincias();
    });
  }

  editProvincia(provincia: Provincia) {
    const dialogRef = this.dialog.open(ProvinciaDialogComponent, {
      width: '400px',
      data: provincia
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProvincias();
    });
  }

  confirmDelete(idProvincia: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Está seguro de que desea eliminar esta provincia?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.eliminarProvincia(idProvincia);
    });
  }

  eliminarProvincia(idProvincia: number) {
    this.provinciaService.eliminarProvincia(idProvincia).subscribe({
      next: () => {
        console.log('Provincia eliminada correctamente');
        this.loadProvincias();
      },
      error: (err) => console.error('Error al eliminar provincia:', err)
    });
  }
}
